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
             :loading="loading"
             @click="submitForm">submit</v-btn>
    </v-form>

    <!-- Sign in errors -->
    <div class="text-xs-center">
     <v-dialog
       v-model="dialog"
       width="500"
     >

       <v-card>
         <v-card-title
           class="headline red lighten-1"
           primary-title
         >
           Error!
         </v-card-title>

         <v-card-text>
           <p v-for="(error, index) in errors" :key="index">{{ error }}</p>
         </v-card-text>

         <v-divider></v-divider>

         <v-card-actions>
           <v-spacer></v-spacer>
           <v-btn
             color="primary"
             flat
             @click="dialog = false"
           >
             I accept
           </v-btn>
         </v-card-actions>
       </v-card>
     </v-dialog>
   </div>

  </div>
</template>

<script>
import { fb } from '@/config/Firebase'

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
      ],
      errors: [],
      dialog: false
    }
  },

  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {

        // Showing loading animation
        this.loading = true;

        // Setting user variable
        const user = {
          email: this.email,
          password: this.password,
        };

        // Activates if the user is signing in
        if (this.signIn) {
          console.log(user.email + ' is trying to log in.');
          fb.auth().signInWithEmailAndPassword(user.email, user.password)
          .then(() => {
            // Stopping loading animation
            this.loading = false;

          })
          .catch(error => {
            // Handle Errors here.
            var errorMessage = error.message;

            // Clear error array then push new error to array
            this.errors = []
            this.errors.push(errorMessage);

            // Opens error dialog
            this.dialog = true

            // Stopping loading animation
            this.loading = false;
          });
        }

        // Activates if the user is signing up
        if (!this.signIn) {
          console.log(user.email + ' is trying to sign up.');
          fb.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then(() => {
            // Stopping loading animation
            this.loading = false;

            console.log(user.email + ' has signed up.');

            // Reroutes to sign in
            this.$router.push("/sign-in")
          })
          .catch(error => {
            // Handle Errors here.
            var errorMessage = error.message;

            // Clear error array then push new error to array
            this.errors = []
            this.errors.push(errorMessage);

            // Opens error dialog
            this.dialog = true

            // Stopping loading animation
            this.loading = false;
          });
        }
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
