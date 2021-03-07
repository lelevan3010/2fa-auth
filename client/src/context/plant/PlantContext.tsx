import React, { createContext, useReducer, Dispatch } from "react";
import { reducer } from "./Reducer";

type Action = { type: string; payload: {} };

interface PlantContext {
  Plant: {
    suggestions?: {
      plant_name: String;
      plant_details: {
        common_names: String;
        url: String;
      };
      probability: Number;
      similar_images: {
        url: String;
      }[];
    }[];
  };
  dispatchPlant: Dispatch<Action>;
}

const initialState = {};

const initialContext: PlantContext = {
  Plant: { ...initialState },
  dispatchPlant: (): void => {},
};

export const PlantContext = createContext(initialContext);

export const PlantProvider = ({ children }: any) => {
  const [Plant, dispatchPlant] = useReducer(reducer, initialState);

  return (
    <PlantContext.Provider value={{ Plant, dispatchPlant }}>
      {children}
    </PlantContext.Provider>
  );
};

export const { Consumer } = PlantContext;
