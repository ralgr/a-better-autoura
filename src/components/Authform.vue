<template lang="html">
  <div class="form">
    <!-- Authentication form -->
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
             :loading="authenticatingGetter"
             @click="submitForm">submit</v-btn>
    </v-form>
  </div>
</template>

<script>
import { fb } from '@/config/Firebase'
import { mapActions, mapGetters } from 'vuex'

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
      ],
      dialog: false
    }
  },

  methods: {
    ...mapActions([
      'signInUserAction',
      'createUserAction'
    ]),
    submitForm() {
      if (this.$refs.form.validate()) {
        // Setting user variable
        const user = {
          email: this.email,
          password: this.password,
        };

        // Activates if the user is signing in
        if (this.signIn) {
          // Promise to check if the task is done
          let signInFinished = new Promise((resolve, reject) => {
            resolve(this.signInUserAction(user))
          })

          // Transfer the user to the map if done
          signInFinished.then(value => {
            if (value == true) {
              this.$router.push('/')
            }
          })
        }

        // Activates if the user is signing up
        if (!this.signIn) {
          // Promise to check if the task is done
          let signUpFinished = new Promise((resolve, reject) => {
            resolve(this.createUserAction(user))
          })

          // Transfer the user to the map if done
          signUpFinished.then(value => {
            if (value == true) {
              this.$router.push('/')
            }
          })
        }
      }
    }
  },

  computed: {
    ...mapGetters([
      'authenticatingGetter'
    ]),
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
