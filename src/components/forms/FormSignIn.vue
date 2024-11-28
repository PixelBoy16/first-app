<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-4 text-center">Sign In</h1>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="username" class="block text-gray-700">username:</label>
          <input 
            id="username" 
            v-model="form.username" 
            type="text" 
            required 
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="password" class="block text-gray-700">Password:</label>
          <input 
            id="password" 
            v-model="form.password" 
            type="password" 
            required 
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button 
          type="submit" 
          class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign In
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import type { FormSignIn } from '@/types/Form';

export default defineComponent({
  name: 'SignInComponent',
  setup() {
    const form = reactive<FormSignIn>({
      username: 'emilys',
      password: 'emilyspass'
    });

    const router = useRouter();

    const handleSubmit = async () => {
      const authStore = useAuthStore();
      const response =  await authStore.signIn(form);
      
      console.log(response);

      if (response) { 
        router.push('/about');
      } else {
        console.log('Login failed');
      }
      
    };

    return {
      form,
      handleSubmit
    };
  }
});
</script>



<style scoped></style>
