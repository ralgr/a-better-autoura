<template lang="html">
  <div class="form">
    <v-form class="px-3"
            ref="form">

      <v-text-field label="email"
                    v-model="email"
                    prepend-icon="email"
                    :rules="emailRules"></v-text-field>

      <v-text-field label="verify email"
                    v-if="!signIn"
                    v-model="verifyEmail"
                    prepend-icon="mail_outline"
                    :rules="verifyRules"></v-text-field>

      <v-text-field label="password"
                    v-model="password"
                    :type="show ? 'text' : 'password'"
                    :append-icon="show ? 'visibility' : 'visibility_off'"
                    @click:append="show = !show"
                    prepend-icon="lock"
                    :rules="rules"></v-text-field>

      <v-btn flat round large
             class="green mx-0 mt-3 text-lowercase"
             :loading="loading"
             @click="submitForm">submit</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "Authform",

  props: {
    signIn: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      loading: false,
      email: '',
      verifyEmail: '',
      password: '',
      show: false,
      rules: [
        v => !!v || 'Password is required',
        v => v.length > 6 || 'Minimum length is 6 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    }
  },

  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        console.log('Clicked validate');
        this.loading = true;

        const user = {
          email: this.email,
          password: this.password,
        };

        setTimeout(this.loading = false, 1000)

        // db.collection('anti-lazy-projects').add(project)
        // .then(() => {
        //   this.loading = false;
        //   this.dialog = false;
        //   this.$emit('project-added')
        // })
      }
    }
  },

  computed: {
    verifyRules () {
        const rules = [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ]

        if (this.email) {
          const rule =
            v => (!!v && v) === this.email ||
              'Values do not match'

          rules.push(rule)
        }

        return rules
      }
  }
}
</script>

<style lang="css" scoped>
</style>
