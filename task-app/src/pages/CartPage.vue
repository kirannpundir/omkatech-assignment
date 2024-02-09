<template>
  <div class="main-wrapper">
    <h2>Cart Page</h2>
    <div class="formdata" v-if="showform">
      <label for="fname"> Name</label>
      <input
        type="text"
        id="name"
        name="name"
        v-model="formData.name"
        placeholder="Enter Your name"
      />
      <label for="email">Email</label>
      <input
        type="email"
        id="lname"
        name="email"
        placeholder="Enter your mail id"
        v-model="formData.mail"
      />
      <label for="tel">Mobile Number</label>

      <input
        type="tel"
        class="phone-input"
        placeholder="Enter phone number"
        pattern="[0-9]{10}"
        required
        v-model="formData.number"
      />
      <label>Your Selected Location</label>
      <select>
        <option>
          {{ selectedOption }}
        </option>
      </select>
      <div class="select-text">
        Your Selected Properties
        <span class="selectevalue">{{ checkedOptions.join(", ") }}</span>
      </div>
      <div class="selectedloc-btn">
        <button
          :disabled="
            formData.name && formData.number && formData.mail === false
          "
          @click="submitform"
        >
          SUBMIT
        </button>
      </div>
    </div>
    <p
      class="submitform"
      v-if="submitext && formData.name && formData.number && formData.mail"
    >
      Your Form Submitted Successfully :)
    </p>
  </div>
</template>
<script>
import { useRoute } from "vue-router";
import { reactive, ref } from "vue";
export default {
  name: "CartPage",
  setup() {
    const route = useRoute();
    const submitext = ref(false);
    const showform = ref(true);
    const formData = reactive({
      name: "",
      email: "",
      number: "",
    });
    const checkedOptions = Array.isArray(route.query.checkedOptions)
      ? route.query.checkedOptions
      : [];
    const selectedOption = route.query.selectedOption || "";
    const submitform = () => {
      submitext.value = true;
      showform.value = false;
    };
    return {
      checkedOptions,
      selectedOption,
      submitform,
      submitext,
      showform,
      formData,
    };
  },
};
</script>
<style lang="less" scoped>
.main-wrapper {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 767px) {
    width: 90%;
  }
  h2 {
    padding: 16px;
    margin: 0px;
    text-align: center;
    background: #000;
    color: #fff;
    font-family: sans-serif;
  }
  .formdata {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 15px;
    p {
      margin: 0px;
      padding: 4px 10px;
      margin-bottom: 10px;
    }
    label {
      font-size: 14px;
      color: #000;
      font-family: sans-serif;
      padding-bottom: 10px;
    }
    input {
      letter-spacing: 0.3px;
      height: 30px;
      margin-bottom: 10px;
      font-family: sans-serif;
      font-size: 12px;
      color: #503e3e;
      font-weight: 600;
      border: 2px solid orange;
    }
    select {
      height: 30px;
      margin-bottom: 10px;
      background: #e8f0fe;
      border: 2px solid orange;
    }
    .select-text {
      text-align: center;
      padding-top: 10px;
      font-size: 14px;
      font-family: sans-serif;
      .selectevalue {
        color: #0da30d;
        font-weight: 600;
        font-family: sans-serif;
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
  .submitform {
    text-align: center;
    color: #ad00a6;
    font-size: 20px;
    padding: 40px;
    font-family: sans-serif;
    font-weight: 600;
  }
}
</style>
