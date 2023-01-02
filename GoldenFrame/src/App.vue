<script setup>
import { onMounted, ref } from "vue";
import framesData from "./frames_data.json";
import elementDraggable from "./lib/elementDraggable";
import {
  handleHeight,
  handleRotate,
  handleSkew,
  handleWidth,
  downloadImage,
} from "@/lib/eventHandler";

const selectedFrame = ref(framesData[0]);
const uploadedImage = ref("");
let isMobile = false;

onMounted(() => {
  elementDraggable(document.getElementById("frame"));

  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    isMobile = true;
  }
});

function handleImage(e) {
  const file = e.target.files[0];
  uploadedImage.value = URL.createObjectURL(file);
  document.getElementById("frame").style.width = "100%";
  document.getElementById("frame").style.height = "100%";
}
</script>

<template>
  <main class="grid min-h-screen place-items-center py-12">
    <div class="flex flex-col gap-6 items-center justify-center">
      <div class="flex flex-col gap-2">
        <h1 class="md:text-6xl text-4xl font-bold col-span-2 text-center">
          🖼️ Golden Frame
        </h1>
        <h2 class="text-base text-base-content/25 text-center" v-if="isMobile">
          This app is not optimized for mobile devices. Better use a desktop
          browser.
        </h2>
      </div>

      <!-- Image -->
      <div class="relative" id="frameImg">
        <img
          :src="selectedFrame.path"
          :alt="selectedFrame.name"
          class="rounded-xl md:max-w-[60vw] md:max-h-[60vh] max-w-[80vw] max-h-[80vh]"
          draggable="false"
        />
        <img
          :src="uploadedImage"
          class="absolute top-0 left-0 max-w-[80vw] max-h-[80vh]"
          draggable="false"
          id="frame"
          width="100%"
          height="100%"
        />
      </div>

      <!-- Image options -->
      <div
        class="flex md:flex-row flex-col gap-6 items-center w-full justify-between"
      >
        <div
          tabindex="0"
          class="collapse collapse-arrow bg-neutral-content/5 rounded-box w-full"
          v-if="uploadedImage"
        >
          <input type="checkbox" />
          <div class="collapse-title text-xl font-medium">Image Options</div>
          <div class="collapse-content">
            <div class="flex flex-col gap-4 w-full" v-if="uploadedImage">
              <!-- Width slider -->
              <div class="flex flex-col gap-2">
                <label for="width">Width:</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value="50"
                  class="slider slider-primary"
                  id="width"
                  @input="handleWidth"
                />

                <div class="flex flex-row gap-2 justify-between">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              <!-- Height slider -->
              <div class="flex flex-col gap-2">
                <label for="height">Height:</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value="50"
                  class="slider slider-primary"
                  id="height"
                  @input="handleHeight"
                />

                <div class="flex flex-row gap-2 justify-between">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              <div class="flex flex-row gap-2 w-full">
                <!-- Skew slider -->
                <div class="flex flex-col gap-2 w-full">
                  <label for="skew">Skew:</label>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    step="1"
                    value="0"
                    class="slider slider-primary"
                    id="skew"
                    @input="handleSkew"
                  />

                  <div class="flex flex-row gap-2 justify-between">
                    <span>-100deg</span>
                    <span>0deg</span>
                    <span>100deg</span>
                  </div>
                </div>

                <!-- Rotate slider -->
                <div class="flex flex-col gap-2 w-full">
                  <label for="rotate">Rotate:</label>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    step="1"
                    value="0"
                    class="slider slider-primary"
                    id="rotate"
                    @input="handleRotate"
                  />

                  <div class="flex flex-row gap-2 justify-between">
                    <span>-180deg</span>
                    <span>0deg</span>
                    <span>180deg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Frame options -->
      <div
        class="flex md:flex-row flex-col gap-6 items-center w-full justify-between"
      >
        <div
          tabindex="0"
          class="collapse collapse-arrow bg-neutral-content/5 rounded-box w-full"
        >
          <input type="checkbox" checked />
          <div class="collapse-title text-xl font-medium">Frame Options</div>
          <div class="collapse-content">
            <div class="flex flex-col gap-6">
              <div class="flex flex-col gap-2 w-full">
                <label for="select">Choose a frame:</label>
                <select
                  class="select select-bordered w-full"
                  name="select"
                  v-model="selectedFrame"
                >
                  <option
                    v-for="frame in framesData"
                    :key="frame"
                    :value="frame"
                  >
                    {{ frame.name }}
                  </option>
                </select>
              </div>
              <div class="flex flex-col gap-2 w-full">
                <label for="file">Upload your image:</label>
                <input
                  name="file"
                  type="file"
                  accept="image/jpeg, image/png"
                  class="file-input file-input-bordered w-full"
                  @change="handleImage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Download -->
      <button class="btn btn-primary w-full" @click="downloadImage">
        Download
      </button>
    </div>
  </main>
</template>
