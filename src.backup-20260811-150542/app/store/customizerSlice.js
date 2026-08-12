import { createSlice } from "@reduxjs/toolkit";
import { getStyleById } from "../data/hoodieStyles";

const MAX_HISTORY = 30;

function genId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

const defaultProduct = getStyleById("pullover");

const emptyDesign = { front: [], back: [], left: [], right: [], hood: [], pocket: [] };

const initialState = {
  currentStep: 1,
  productId: "pullover",
  quantity: 10,
  size: "L",
  fabricId: "heavyweight-cotton",
  colors: { ...defaultProduct.defaultColors },
  activeColorPart: "body",
  activeView: "front",
  design: emptyDesign,
  selectedLayerId: null,
  history: { past: [], future: [] },
  printingAssignments: [
    { id: "pa-front", methodId: "embroidery", locationId: "front" },
    { id: "pa-back", methodId: "embroidery", locationId: "back" },
  ],
  accessorySelections: [
    { id: "wovenLabel", locationId: "insideNeck", quantity: 1 },
    { id: "hangTag", locationId: "sideSeam", quantity: 1 },
    { id: "drawstrings", locationId: "hood", quantity: 1 },
  ],
  lastSavedAt: null,
};

function snapshot(state) {
  state.history.past.push({
    colors: { ...state.colors },
    design: JSON.parse(JSON.stringify(state.design)),
  });
  if (state.history.past.length > MAX_HISTORY) state.history.past.shift();
  state.history.future = [];
}

const customizerSlice = createSlice({
  name: "customizer",
  initialState,
  reducers: {
    setStep(state, action) {
      state.currentStep = action.payload;
    },
    setProduct(state, action) {
      const style = getStyleById(action.payload);
      if (!style) return;
      snapshot(state);
      state.productId = action.payload;
      state.colors = { ...style.defaultColors };
      if (!style.views.includes(state.activeView)) state.activeView = "front";
    },
    setQuantity(state, action) {
      state.quantity = Math.max(1, Number(action.payload) || 1);
    },
    setSize(state, action) {
      state.size = action.payload;
    },
    setFabric(state, action) {
      state.fabricId = action.payload;
    },

    setActiveColorPart(state, action) {
      state.activeColorPart = action.payload;
    },
    setPartColor(state, action) {
      const { part, colorId } = action.payload;
      snapshot(state);
      state.colors[part] = colorId;
    },
    applyColorPreset(state, action) {
      const preset = action.payload;
      snapshot(state);
      state.colors = { ...preset };
    },

    setActiveView(state, action) {
      state.activeView = action.payload;
    },

    addDesignLayer(state, action) {
      const { view, layer } = action.payload;
      snapshot(state);
      const id = genId("layer");
      state.design[view] = [...(state.design[view] || []), { ...layer, id }];
      state.selectedLayerId = id;
    },
    updateDesignLayer(state, action) {
      const { view, id, changes } = action.payload;
      const layers = state.design[view] || [];
      const layer = layers.find((l) => l.id === id);
      if (layer) Object.assign(layer, changes);
    },
    commitDesignLayer(state) {
      snapshot(state);
    },
    removeDesignLayer(state, action) {
      const { view, id } = action.payload;
      snapshot(state);
      state.design[view] = (state.design[view] || []).filter((l) => l.id !== id);
      if (state.selectedLayerId === id) state.selectedLayerId = null;
    },
    duplicateDesignLayer(state, action) {
      const { view, id } = action.payload;
      const layer = (state.design[view] || []).find((l) => l.id === id);
      if (!layer) return;
      snapshot(state);
      const newId = genId("layer");
      state.design[view].push({ ...layer, id: newId, x: (layer.x || 0) + 12, y: (layer.y || 0) + 12 });
      state.selectedLayerId = newId;
    },
    reorderDesignLayer(state, action) {
      const { view, id, direction } = action.payload;
      const layers = state.design[view] || [];
      const index = layers.findIndex((l) => l.id === id);
      if (index === -1) return;
      const swapWith = direction === "up" ? index + 1 : index - 1;
      if (swapWith < 0 || swapWith >= layers.length) return;
      snapshot(state);
      [layers[index], layers[swapWith]] = [layers[swapWith], layers[index]];
    },
    setSelectedLayer(state, action) {
      state.selectedLayerId = action.payload;
    },

    undo(state) {
      const prev = state.history.past.pop();
      if (!prev) return;
      state.history.future.push({
        colors: { ...state.colors },
        design: JSON.parse(JSON.stringify(state.design)),
      });
      state.colors = prev.colors;
      state.design = prev.design;
    },
    redo(state) {
      const next = state.history.future.pop();
      if (!next) return;
      state.history.past.push({
        colors: { ...state.colors },
        design: JSON.parse(JSON.stringify(state.design)),
      });
      state.colors = next.colors;
      state.design = next.design;
    },

    addPrintingAssignment(state, action) {
      const { methodId, locationId } = action.payload;
      const exists = state.printingAssignments.some((a) => a.locationId === locationId);
      if (exists) return;
      state.printingAssignments.push({ id: genId("pa"), methodId, locationId });
    },
    removePrintingAssignment(state, action) {
      state.printingAssignments = state.printingAssignments.filter((a) => a.id !== action.payload);
    },
    setPrintingAssignmentMethod(state, action) {
      const { id, methodId } = action.payload;
      const assignment = state.printingAssignments.find((a) => a.id === id);
      if (assignment) assignment.methodId = methodId;
    },

    toggleAccessorySelection(state, action) {
      const { id, locationId } = action.payload;
      const exists = state.accessorySelections.find((a) => a.id === id);
      if (exists) {
        state.accessorySelections = state.accessorySelections.filter((a) => a.id !== id);
      } else {
        state.accessorySelections.push({ id, locationId, quantity: 1 });
      }
    },
    setAccessoryQuantity(state, action) {
      const { id, quantity } = action.payload;
      const selection = state.accessorySelections.find((a) => a.id === id);
      if (selection) selection.quantity = Math.max(1, quantity);
    },

    markDraftSaved(state) {
      state.lastSavedAt = new Date().toISOString();
    },
    hydrateConfigurator(state, action) {
      return { ...state, ...action.payload, history: { past: [], future: [] } };
    },
    resetConfigurator() {
      return initialState;
    },
  },
});

export const {
  setStep,
  setProduct,
  setQuantity,
  setSize,
  setFabric,
  setActiveColorPart,
  setPartColor,
  applyColorPreset,
  setActiveView,
  addDesignLayer,
  updateDesignLayer,
  commitDesignLayer,
  removeDesignLayer,
  duplicateDesignLayer,
  reorderDesignLayer,
  setSelectedLayer,
  undo,
  redo,
  addPrintingAssignment,
  removePrintingAssignment,
  setPrintingAssignmentMethod,
  toggleAccessorySelection,
  setAccessoryQuantity,
  markDraftSaved,
  hydrateConfigurator,
  resetConfigurator,
} = customizerSlice.actions;

export default customizerSlice.reducer;

export const selectCustomizer = (state) => state.customizer;
