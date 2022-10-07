import React from "react";

import config from "../config";
import { IConfig } from "../types";

export const useConfig = () => React.useMemo<IConfig>(() => config, []);
