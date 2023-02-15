import { useMemo } from "react";

import config from "../config";
import { IConfig } from "../types";

export const useConfig = () => useMemo<IConfig>(() => config, []);
