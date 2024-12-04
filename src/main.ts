import './style.css'
import "gridjs/dist/theme/mermaid.css";
import { Grid } from "gridjs";
import Vortex, { vortexLoad } from "a10y-vortex";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Vortex File Explorer</h1>
    <p class="read-the-docs">
      Vortex is a new analytic file format. It relies on novel codecs that
      vectorize extremely well on modern hardware.
    </p>
    <p class="read-the-docs">
      This playground allows you to understand the structure of a Vortex file, and perform helpful operations
      to read and analyze data over the file.
    </p>
    <p>
    Upload a vortex file:
    <input type="file" id="file-picker"/>
    </p>
    <div id="data-grid"></div>
  </div>
`

// Launch the Vortex load on page load.
vortexLoad().then(() => {
  console.log("vortex loaded");
  const filePicker = document.getElementById("file-picker")!;

  // Read from blob.
  async function processFile(blob: Blob) {
    const file = await Vortex.File.fromBlob(blob);
    const array = await file.collect();

    // Take the first 500 rows max.
    const headLimit = Math.min(array.length(), 500);
    const sliced = array.slice(0, headLimit);

    // Append as child to new hidden element.
    new Grid({
      columns: sliced.columns(),
      data: sliced.to_js(),
      pagination: {
        limit: 20,
      }
    }).render(document.getElementById("data-grid")!);
  }

  filePicker.onchange = () => {
    const file = (filePicker as any).files[0];

    // we can't await but it gets spawned
    processFile(file);
  }
});