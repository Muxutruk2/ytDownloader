let rightToLeft = false;
if (localStorage.getItem("rightToLeft")) {
	rightToLeft = localStorage.getItem("rightToLeft");
}
if (rightToLeft == "true") {
	document.querySelectorAll(".prefBox").forEach((item) => {
		item.style.flexDirection = "row-reverse";
	});
} else {
	console.log("Change to left to right");
	document.querySelectorAll(".prefBox").forEach((item) => {
		item.style.flexDirection = "row";
	});
}
let downloadPath = localStorage.getItem("downloadPath");
getId("path").textContent = downloadPath;

const { ipcRenderer } = require("electron");
function getId(id) {
	return document.getElementById(id);
}

getId("back").addEventListener("click", () => {
	ipcRenderer.send("close-secondary");
});

// Selecting download directory
getId("selectLocation").addEventListener("click", () => {
	ipcRenderer.send("select-location", "");
});

ipcRenderer.on("downloadPath", (event, downloadPath) => {
	console.log(downloadPath);
	localStorage.setItem("downloadPath", downloadPath);
	getId("path").textContent = downloadPath;
});

const enabledTransparent = getId("enableTransparent");
enabledTransparent.addEventListener("change", (event) => {
	if (enabledTransparent.checked) {
		localStorage.setItem("enabledTransparent", "true");
	} else {
		localStorage.setItem("enabledTransparent", "false");
	}
});

const localEnabledTransparent = localStorage.getItem("enabledTransparent");
if (localEnabledTransparent == "true") {
	enabledTransparent.checked = true;
}

// Selecting config directory

getId("configBtn").addEventListener("click", () => {
	ipcRenderer.send("select-config", "");
});

ipcRenderer.on("configPath", (event, configPath) => {
	console.log(configPath);
	localStorage.setItem("configPath", configPath);
	getId("configPath").textContent = configPath;
});

const configCheck = getId("configCheck");
configCheck.addEventListener("change", (event) => {
	if (configCheck.checked) {
		getId("configOpts").style.display = "flex";
	} else {
		getId("configOpts").style.display = "none";
		localStorage.setItem("configPath", "");
	}
});

const configPath = localStorage.getItem("configPath");
if (configPath) {
	getId("configPath").textContent = configPath;
	configCheck.checked = true;
	getId("configOpts").style.display = "flex";
}

// Language settings

const language = localStorage.getItem("language");

if (language) {
	getId("select").value = language;
}
function changeLanguage() {
	const language = getId("select").value;
	localStorage.setItem("language", language);
	if (language === "fa") {
		rightToLeft = true;
		localStorage.setItem("rightToLeft", true);
	} else {
		rightToLeft = false;
		localStorage.setItem("rightToLeft", false);
	}
}

// Browser preferences
let browser = localStorage.getItem("browser");
if (browser) {
	getId("browser").value = browser;
}

getId("browser").addEventListener("change", () => {
	browser = getId("browser").value;
	localStorage.setItem("browser", browser);
});

// Handling preferred video quality

let preferredVideoQuality = localStorage.getItem("preferredVideoQuality");
if (preferredVideoQuality) {
	getId("preferredVideoQuality").value = preferredVideoQuality;
}

getId("preferredVideoQuality").addEventListener("change", () => {
	preferredVideoQuality = getId("preferredVideoQuality").value;
	localStorage.setItem("preferredVideoQuality", preferredVideoQuality);
});

// Handling preferred audio quality

let preferredAudioQuality = localStorage.getItem("preferredAudioQuality");
if (preferredAudioQuality) {
	getId("preferredAudioQuality").value = preferredAudioQuality;
}

getId("preferredAudioQuality").addEventListener("change", () => {
	preferredAudioQuality = getId("preferredAudioQuality").value;
	localStorage.setItem("preferredAudioQuality", preferredAudioQuality);
});

// Reload
function reload() {
	ipcRenderer.send("reload");
}
getId("restart").addEventListener("click", () => {
	reload();
});

// Handling filename formats
getId("filenameFormat").addEventListener("input", () => {
	const text = getId("filenameFormat").value;
	localStorage.setItem("filenameFormat", text);
});

if (localStorage.getItem("filenameFormat")) {
	getId("filenameFormat").value = localStorage.getItem("filenameFormat");
}

getId("resetFilenameFormat").addEventListener("click", () => {
	getId("filenameFormat").value = "%(playlist_index)s.%(title)s.%(ext)s";
	localStorage.setItem(
		"filenameFormat",
		"%(playlist_index)s.%(title)s.%(ext)s"
	);
});

// Handling folder name formats
getId("foldernameFormat").addEventListener("input", () => {
	const text = getId("foldernameFormat").value;
	localStorage.setItem("foldernameFormat", text);
});

if (localStorage.getItem("foldernameFormat")) {
	getId("foldernameFormat").value = localStorage.getItem("foldernameFormat");
}

getId("resetFoldernameFormat").addEventListener("click", () => {
	getId("foldernameFormat").value = "%(playlist_title)s";
	localStorage.setItem("foldernameFormat", "%(playlist_title)s");
});

// Max active downloads
getId("maxDownloads").addEventListener("input", ()=>{
	const number = Number(getId("maxDownloads").value)

	if (number < 1){
		localStorage.setItem("maxActiveDownloads", 1)
	}
	else{
		localStorage.setItem("maxActiveDownloads", number)
	}
})

if (localStorage.getItem("maxActiveDownloads")){
	getId("maxDownloads").value = localStorage.getItem("maxActiveDownloads")
}

// Closing app to system tray
const closeToTray = getId("closeToTray");
closeToTray.addEventListener("change", (event) => {
	if (closeToTray.checked) {
		localStorage.setItem("closeToTray", "true");
		ipcRenderer.send("useTray", true)
	} else {
		localStorage.setItem("closeToTray", "false");
		ipcRenderer.send("useTray", false)

	}
});
const trayEnabled = localStorage.getItem("closeToTray")
if(trayEnabled == "true"){
	closeToTray.checked = true;
	ipcRenderer.send("useTray", true)
}

// Translation file
require("../src/translate_preferences");
