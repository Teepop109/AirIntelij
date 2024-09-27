<template>
  <div class="full-background">
    <div class="title-container">
      <h1 class="title">Temperature Status</h1> <!-- Wrapped title in a div -->
    </div>
    <div class="flex flex-wrap justify-center items-center space-x-4">
      <div class="card card-compact w-80 bg-base-100 shadow-xl mb-4">
        <figure>
          <img src="https://media.istockphoto.com/id/1322262316/vector/air-conditioner-simple-flat-illustration.jpg?s=612x612&w=0&k=20&c=ypPME83T44Ez-TJ89L6v6a6B97JB8TMyzIf8WNoARZQ=" alt="Air Conditioner" />
        </figure>
        <div class="card-body flex flex-col items-center justify-center text-center">
          <h2 class="card-title">Front Temperature</h2>
          <div class="mt-1">
            <h3 class="text-lg font-semibold text-center">Temperature: {{ sensorTemperatureCelsius }}°C / {{ sensorTemperatureFahrenheit }}°F</h3>
          </div>
        </div>
      </div>
      <div class="card card-compact w-80 bg-base-100 shadow-xl mb-4">
        <figure>
          <img src="https://i.pinimg.com/564x/a8/d8/88/a8d8882d1e22b750207940c2153b141a.jpg" alt="Air Conditioner" />
        </figure>
        <div class="card-body flex flex-col items-center justify-center text-center">
          <h2 class="card-title">Back Temperature</h2>
          <div class="mt-1">
            <h3 class="text-lg font-semibold text-center">Temperature: {{ sensorTemperatureCelsius }}°C / {{ sensorTemperatureFahrenheit }}°F</h3>
          </div>
        </div>
      </div>
      <div class="card card-compact w-80 bg-base-100 shadow-xl mb-4">
        <figure>
          <img src="https://i.pinimg.com/564x/12/ef/dc/12efdcf009eb22a1c17e0ceda0232d66.jpg" alt="Air Conditioner" />
        </figure>
        <div class="card-body flex flex-col items-center justify-center text-center">
          <h2 class="card-title">Heat Coil Temperature</h2>
          <div class="mt-1">
            <h3 class="text-lg font-semibold text-center">Temperature: {{ sensorTemperatureCelsius }}°C / {{ sensorTemperatureFahrenheit }}°F</h3>
          </div>
        </div>
      </div>
      <div class="card card-compact w-80 bg-base-100 shadow-xl mb-4">
        <figure>
          <img src="https://f.ptcdn.info/057/082/000/s2vr9t54pdJlYZExSV4u-o.jpg" alt="Air Conditioner" />
        </figure>
        <div class="card-body flex flex-col items-center justify-center text-center">
          <h2 class="card-title">Cool Coil Temperature</h2>
          <div class="mt-1">
            <h3 class="text-lg font-semibold text-center">Temperature: {{ sensorTemperatureCelsius }}°C / {{ sensorTemperatureFahrenheit }}°F</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed bottom-4 right-4 flex flex-col items-end space-y-2">
      <button @click="goToDashboard" class="btn btn-primary">Home</button>
      <button @click="logout" class="btn btn-error">Logout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '../firebaseConfig';
import mqtt, { MqttClient } from 'mqtt';

const sensorTemperatureCelsius = ref(0); // Ref for sensor temperature in Celsius
const sensorTemperatureFahrenheit = ref(0); // Ref for sensor temperature in Fahrenheit
const router = useRouter();
const mqttServer = 'wss://test.mosquitto.org:8081';
const mqttName = 'AirTest';
const sensorTopic = 'AirTest/temperature'; // Define the sensor topic
let client: MqttClient | null = null;

const logout = () => {
  auth.signOut().then(() => {
    router.push('/login');
  }).catch((error: Error) => {
    console.error('Sign out error:', error);
  });
};

const goToDashboard = () => {
  router.push('/dashboard');
};

const connectToMQTT = () => {
  client = mqtt.connect(mqttServer);
  client.on('connect', () => {
    console.log('Connected to MQTT Broker');
    subscribeToSensorTopic();
  });
  client.on('error', (error: Error) => {
    console.error('MQTT Error:', error);
  });
  client.on('message', (topic, message) => {
    if (topic === sensorTopic) {
      const sensorTempCelsius = parseFloat(message.toString());
      sensorTemperatureCelsius.value = sensorTempCelsius;
      sensorTemperatureFahrenheit.value = (sensorTempCelsius * 9 / 5) + 32; // Convert to Fahrenheit
    }
  });
};

const subscribeToSensorTopic = () => {
  if (client) {
    client.subscribe(sensorTopic, (err) => {
      if (err) {
        console.error('Subscription error:', err);
      } else {
        console.log('Subscribed to sensor topic');
      }
    });
  }
};

onMounted(() => {
  connectToMQTT();
});

onUnmounted(() => {
  if (client) {
    client.end();
  }
});
</script>

<style scoped>
.full-background {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /* Align items vertically */
  background-image: url('https://img.freepik.com/free-photo/living-room-with-tv-sofas-blurred_1203-1103.jpg?w=1060&t=st=1727424861~exp=1727425461~hmac=1ce82256b0b5e1a04ec0d908a2e919cc8a1cd1236aba58bb24afebb6a74d9717');
  background-size: cover; /* Cover the entire area */
  background-position: center; /* Center the background image */
}

.title-container {
  background-color: white; /* White background for title */
  padding: 20px; /* Add padding around the title */
  border-radius: 8px; /* Rounded corners */
  margin-bottom: 20px; /* Space below the title container */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Shadow effect */
}

.title {
  font-size: 3rem; /* Adjust title size as needed */
  color: black; /* Change text color */
  text-align: center; /* Center the title text */
}

.card-compact {
  margin: 0 auto;
}

.space-x-1 > * {
  /* Add spacing between boxes */
}

.space-x-1 > * {
  margin-right: 5px;
}

.space-y-1 > * {
  margin-bottom: 16px; /* Add vertical spacing (if necessary) */
}
</style>
