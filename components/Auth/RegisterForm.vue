<template>
  <div>
    <div class="pt-5 space-y-6">
      <UIInput
        label="Username"
        placeholder="@username"
        v-model="data.username"
      />
      <UIInput label="Name" placeholder="Name" v-model="data.name" />
      <UIInput
        label="Email"
        placeholder="user@email.com"
        v-model="data.email"
      />
      <UIInput
        label="Password"
        placeholder="********"
        type="password"
        v-model="data.password"
      />
      <UIInput
        label="Repeat Password"
        placeholder="********"
        type="password"
        v-model="data.repeatPassword"
      />
      <div>
        <button @click="handleRegister">Submit</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const data = reactive({
  username: '',
  email: '',
  name: '',
  password: '',
  repeatPassword: '',
  loading: false,
});

async function handleRegister() {
  const { register } = useAuth();
  try {
    await register({
      username: data.username,
      name: data.name,
      email: data.email,
      password: data.password,
      repeatPassword: data.repeatPassword,
    });
  } catch (err) {
  } finally {
  }
}
</script>
