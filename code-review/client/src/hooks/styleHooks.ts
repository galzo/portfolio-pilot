import { SxProps, Theme, useTheme } from "@mui/material";
import { useMemo } from "react";

export type StyleGenerator<TStyleKey, TProps> = (
  theme: Theme,
  props: TProps
) => Record<keyof TStyleKey, SxProps<Theme>>;

export function useStyleHook<TStyleKey, TProps = Record<never, never>>(
  styleGenerator: StyleGenerator<TStyleKey, TProps>,
  props: TProps = {} as TProps
) {
  const theme = useTheme();

  const renderedStyle = useMemo(() => {
    return styleGenerator(theme, props);
  }, [props, styleGenerator, theme]);

  return renderedStyle;
}

export function createStyleHook<TStyleKey>(
  styleGenerator: StyleGenerator<TStyleKey, undefined>
): () => Record<keyof TStyleKey, SxProps<Theme>>;

export function createStyleHook<TStyleKey, TProps>(
  styleGenerator: StyleGenerator<TStyleKey, TProps>
): (props: TProps) => Record<keyof TStyleKey, SxProps<Theme>>;

export function createStyleHook<TStyleKey, TProps = Record<never, never>>(
  styleGenerator: StyleGenerator<TStyleKey, TProps>
) {
  return (props: TProps = {} as TProps) => {
    return useStyleHook(styleGenerator, props);
  };
}
