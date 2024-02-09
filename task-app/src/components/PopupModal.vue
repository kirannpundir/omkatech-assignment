<template>
  <div>
    <div class="overlay"></div>
    <div class="main-div">
      <div class="properties-wrapper">
        <!-- properties popup  start -->
        <form @submit="addtocart">
          <span class="close" @click="closepopup">X</span>
          <div class="properties-modal">
            <div class="selectedoption-div">
              <p>
                Properties available in
                <span class="selectevalue">{{ selectedOption }}</span>
              </p>
              <div class="property-div">
                <label v-for="option in getPropertiesByLocation" :key="option">
                  <input
                    v-model="checkedOptions"
                    type="checkbox"
                    :value="option"
                  />
                  {{ option }}
                </label>
              </div>
              <div v-if="checkedOptions.length > 0">
                <p class="select-text">
                  Your selected value:
                  <span class="selectevalue">{{
                    checkedOptions.join(", ")
                  }}</span>
                </p>
              </div>
            </div>
            <div class="submitprop-btn">
              <button :disabled="checkedOptions.length === 0">
                ADD TO CART
              </button>
            </div>
          </div>
        </form>
        <!-- properties popup  end -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "PopupModal",
  props: {
    selectedOption: String,
  },

  setup(props, context) {
    const router = useRouter();
    const checkedOptions = ref([]);
    const closemodal = ref(true);
    const propertiesByLocation = {
      "New Delhi": ["Rohini", "Rithala", "Pratap Nagar"],
      Bangalore: ["Jayanagar", "Indira Nagar", "Ashok Nagar"],
      Pune: ["Kalyani Nagar", "Shivaji Nagar", "Magarpatta City"],
    };

    const getPropertiesByLocation = computed(() => {
      return propertiesByLocation[props.selectedOption] || [];
    });
    const closepopup = () => {
      closemodal.value = false;
      context.emit("closemodal", closemodal.value);
      var modal = document.querySelector(".properties-wrapper");
      modal.classList.toggle("active");
    };
    const addtocart = () => {
      const selectedOptionsAsString = checkedOptions.value.map((option) =>
        option.toString()
      );

      router.push({
        name: "cart",
        query: {
          checkedOptions: selectedOptionsAsString,
          selectedOption: props.selectedOption,
        },
      });
    };

    return {
      addtocart,
      getPropertiesByLocation,
      checkedOptions,
      closepopup,
      closemodal,
    };
  },
};
</script>

<style lang="less" scoped>
.main-div {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  .close {
    cursor: pointer;
    text-align: right;
    display: flex;
    justify-content: right;
    font-size: 21px;
    position: absolute;
    right: 10px;
  }

  .properties-wrapper {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    width: 40%;
    background: #fff;
    padding: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: arial;
    display: flex;
    justify-content: center;
    @media (max-width: 767px) {
      width: 90%;
    }
    p {
      font-size: 14px;
      color: #000;
      text-align: center;
      .selectevalue {
        color: #0da30d;
        font-weight: 600;
        font-family: sans-serif;
      }
    }
    label {
      font-size: 16px;
      font-weight: 600;
    }
    .property-div {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
    .select-text {
      text-align: center;
      font-size: 14px;
      font-family: sans-serif;
      .selectevalue {
        color: #0da30d;
        font-weight: 600;
        font-family: sans-serif;
      }
    }
    .submitprop-btn {
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
// overlay css
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  animation: fadeIn 0.3s ease;
  z-index: 1;
}

.properties-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 2;
}

.properties-wrapper.active + .overlay {
  opacity: 1;
  visibility: visible;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
