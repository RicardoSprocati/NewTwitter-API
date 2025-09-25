import "styled-components";
import type { Tema } from "./tema";

declare module "styled-components" {
    export interface DefaultTheme extends Tema {}
}
