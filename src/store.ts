import { epoxyVersion } from "./epoxy";

export let settings = $store(
	{
		wispServer: "wss://anura.pro/",
		epoxyVersion: "",
		stateful: $state({
			urls: ["https://echo.paw.cloud/"]
		}),
	},
	{ ident: "settings", backing: "localstorage", autosave: "auto" },
);