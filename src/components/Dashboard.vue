<template>
  <div class="flex justify-center items-center h-screen bg-snow">
    <div class="card w-96 bg-opacity-80 bg-white shadow-xl border-2 border-gray-200 rounded-lg p-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Home</h1>

      <figure>
        <img src="https://f.ptcdn.info/011/051/000/oplhlcckkPMRPKDOo9c-o.gif" alt="Control Panel" class="rounded-t-lg" />
      </figure>
      <div class="card-body">
        <div class="flex flex-col space-y-4 mt-4">
          <router-link to="/led-control" class="btn bg-blue-400 hover:bg-blue-600 text-white">Temperature Status</router-link>
          <router-link to="/air-conditioner" class="btn bg-pink-400 hover:bg-pink-600 text-white">Air Conditioner Control</router-link>
        </div>
        <div class="flex justify-end mt-4">
          <button @click="logout" class="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-md">
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAuth } from 'firebase/auth';
import { useRouter } from 'vue-router';

export default {
  name: 'Dashboard',
  setup() {
    const router = useRouter();
    const auth = getAuth();

    const logout = () => {
      auth.signOut().then(() => {
        router.push('/login');
      }).catch((error) => {
        console.error('Sign out error:', error);
      });
    };

    return {
      logout,
    };
  },
};
</script>

<style scoped>
/* พื้นหลังหิมะ */
.bg-snow {
  background-image: url('https://cdn.pixabay.com/photo/2022/05/12/16/04/trees-7191822_1280.png');
  background-size: cover;
  background-position: center;
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.card {
  background-color: rgba(255, 255, 255, 0.8); /* เพิ่มความโปร่งแสง */
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-5px);
}

/* เอฟเฟกต์หิมะตก */
.bg-snow::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://media.idownloadblog.com/wp-content/uploads/2016/11/Animated-GIF-Banana.gif') repeat;
  pointer-events: none;
  opacity: 0; /* ปรับความทึบของหิมะ */
}
</style>
