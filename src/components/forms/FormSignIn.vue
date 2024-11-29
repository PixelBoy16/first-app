<script setup lang="ts">
import IconFaecbook from '../icons/IconFaecbook.vue'
import IconGoogle from '../icons/IconGoogle.vue'
import IconLinkedin from '../icons/IconLinkedin.vue'
</script>

<template>
  <div class="container">
    <div :class="['container', { 'right-panel-active': isRightPanelActive }]">
      <div class="form-container sign-up-container">
        <form @submit.prevent="void 0">
          <h1>Create Account</h1>
          <div class="social-container">
            <a href="#" class="social"><IconFaecbook /></a>
            <a href="#" class="social"><IconGoogle /></a>
            <a href="#" class="social"><IconLinkedin /></a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit" class="mt-2">Sign Up</button>
        </form>
      </div>

      <div class="form-container sign-in-container">
        <form @submit.prevent="handleSubmit">
          <h1>Sign in</h1>
          <div class="social-container">
            <a href="#" class="social"><IconFaecbook /></a>
            <a href="#" class="social"><IconGoogle /></a>
            <a href="#" class="social"><IconLinkedin /></a>
          </div>
          <span>or use your account</span>
          <input
            id="username"
            v-model="form.username"
            type="text"
            placeholder="username"
            required
          />
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="password"
            required
          />
          <a href="#">Forgot your password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button class="ghost" @click="togglePanel(false)">Sign In</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button class="ghost" @click="togglePanel(true)">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import type { FormSignIn } from '@/types/Form'

export default defineComponent({
  name: 'SignInComponent',
  data() {
    return {
      form: {
        username: 'emilys',
        password: 'emilyspass',
      } as FormSignIn,
      isRightPanelActive: false,
    }
  },
  methods: {
    async handleSubmit() {
      const authStore = useAuthStore()
      const response = await authStore.signIn(this.form)

      if (response) {
        this.$router.push('/')
      } else {
        alert('Login failed')
      }
    },
    togglePanel(isSignUp: boolean) {
      this.isRightPanelActive = isSignUp
    },
  },
  mounted() {
    this.$router = useRouter()
  },
})
</script>

<style scoped lang="scss">
h1 {
  @apply font-bold text-xl;
}

h2 {
  @apply text-center;
}

p {
  @apply text-sm mt-5 mb-8;
}

span {
  @apply text-xs;
}

a {
  @apply text-black/30 text-xs no-underline	my-4;
}

button {
  @apply rounded-3xl bg-theme border-theme border-solid border text-xs font-bold px-11 py-3 uppercase text-white transition-all	ease-in;

  &:active {
    @apply scale-95;
  }

  &:focus {
    @apply outline-none;
  }

  &.ghost {
    @apply bg-transparent border-white;
  }
}

form {
  @apply bg-white flex items-center justify-center flex-col px-10 h-full text-center;
}

input {
  @apply w-full px-4 py-3 border-none my-2 bg-[#EEE];
}

.container {
  @apply min-h-[480px] max-w-full w-[768px] overflow-hidden relative shadow-lg rounded-xl bg-white;

  &.right-panel-active {
    .sign-in-container {
      @apply translate-x-full;
    }

    .sign-up-container {
      @apply translate-x-full opacity-100 z-[5];
      animation: show 0.6s;
    }

    .overlay-container {
      @apply translate-x-[-100%];
    }

    .overlay {
      @apply translate-x-1/2;
    }

    .overlay-left {
      @apply translate-x-0;
    }

    .overlay-right {
      @apply translate-x-[20%];
    }
  }
}

.form-container {
  @apply absolute top-0 h-full transition-all ease-in-out duration-[.6s];
}

.sign-in-container {
  @apply left-0 w-1/2 z-[2];
}

.sign-up-container {
  @apply left-0 w-1/2 z-[1] opacity-0;
}

.overlay-container {
  @apply absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all ease-in-out duration-[0.6s] z-[100];
}

.overlay {
  @apply relative left-[-100%] h-full w-[200%] translate-x-0 transition-all ease-in-out duration-[0.6s];
  @apply bg-theme text-white bg-gradient-to-r from-emerald-500 from-20% via-sky-500 via-50% to-indigo-500 to-90%;
  @apply bg-no-repeat bg-cover bg-center;
}

.overlay-panel {
  @apply absolute top-0 flex items-center justify-center flex-col;
  @apply px-10 text-center h-full w-1/2 translate-x-0 transition-all ease-in-out duration-[0.6s];
}

.overlay-left {
  @apply translate-x-[-20%];
}

.overlay-right {
  @apply translate-x-0 right-0;
}

.social-container {
  @apply my-0 w-full flex justify-center items-center gap-1.5;

  a {
    @apply border-[#DDD] border rounded-[50%] h-10 w-10 flex justify-center items-center text-black;
  }
}

@keyframes show {
  0%,
  49.99% {
    @apply opacity-0 z-[1];
  }

  50%,
  100% {
    @apply opacity-100 z-[5];
  }
}
</style>
