<template>
  <div>
    <div class="main-wrapper">
      <!-- location modal form start -->
      <div class="location-modal" v-show="showlocData">
        <h2>Select Location</h2>
        <div class="select-location-div">
          <select v-model="selectedOption">
            <option v-for="option in locations" :value="option" :key="option">
              {{ option }}
            </option>
          </select>
        </div>

        <div class="selectedloc-btn">
          <button
            :disabled="selectedOption.length === 0"
            @click="submitLocation"
          >
            Submit
          </button>
        </div>
      </div>
      <!-- location modal form end -->
    </div>
    <!-- properties popup modal   start -->
    <PopupModal
      v-show="showModal"
      :showModal="showModal"
      :selectedOption="selectedOption"
      @closemodal="handleCloseModal"
    />
    <!-- properties popup modal   end -->
  </div>
</template>
<script>
import { ref } from "vue";
import PopupModal from "./PopupModal.vue";
export default {
  components: { PopupModal },
  name: "LocationSelector",
  setup() {
    const selectedOption = ref("Bangalore");
    const showlocData = ref(true);
    const showModal = ref(false);
    const locations = ref(["New Delhi", "Bangalore", "Pune"]);

    const submitLocation = () => {
      console.log("submit item");

      showModal.value = true;
    };
    const handleCloseModal = (closemodalValue) => {
      console.log("Modal closed:", closemodalValue);
      showModal.value = false;
    };
    return {
      locations,
      selectedOption,
      submitLocation,
      showlocData,
      showModal,
      handleCloseModal,
    };
  },
};
</script>
<style lang="less" scoped>
.main-wrapper {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: 30%;
  position: absolute;
  top: 50%;
  background: #fff;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  @media (max-width: 767px) {
    width: 90%;
  }
  .location-modal {
    width: 100%;
    .select-text {
      text-align: center;
      font-size: 14px;
      font-family: sans-serif;
      margin-bottom: 0px;
      .selectevalue {
        color: #0da30d;
        font-weight: 600;
        font-family: sans-serif;
      }
    }
    h2 {
      padding: 16px;
      margin: 0px;
      text-align: center;
      background: #000;
      color: #fff;
      font-family: sans-serif;
    }
    .select-location-div {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 30px;

      select {
        border: 2px solid orange;
        padding: 10px;
        width: 90%;
        margin: auto;
        padding: 10px;
        width: 90%;
        margin: auto;
        font-size: 14px;
        font-weight: 600;
        color: #000;
        option {
          padding: 10px;
          width: 90%;
          margin: auto;
          font-size: 14px;
          font-weight: 600;
          color: #000;
        }
      }
    }
    .selectedloc-btn {
      display: flex;
      justify-content: center;
      padding-top: 20px;
      padding-bottom: 20px;
      button {
        cursor: pointer;
        width: 90%;
        height: 40px;
        border-radius: 50px;
        width: 90%;
        height: 40px;
        border-radius: 50px;
        font-size: 14px;
        color: #000;
        font-weight: 600;
        background: #ffb329;
        border: none;
      }
      button:hover {
        background: #000;
        color: #fff;
      }
    }
  }
}
</style>
