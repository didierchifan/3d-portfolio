"use client";

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const useStore = create()(
  subscribeWithSelector((set) => ({
    clicked: false,
    setClicked: (clicked) => set({ clicked }),
  }))
);

export default useStore;
