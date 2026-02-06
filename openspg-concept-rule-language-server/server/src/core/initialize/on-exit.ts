import { Context, OnExit } from "../context";

export const onExit =
    ({ connection }: Context): OnExit =>
        () => {
            connection.console.log("exited");
        };
