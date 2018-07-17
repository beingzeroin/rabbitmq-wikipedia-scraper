<template>
    <div>
        <h1 class='title'>Welcome to Wikimailer</h1>
        <h5 class='subtitle'>Enter your email to receive a random Wikipedia article every morning!</h5>
        <h6 class='email-header'>Enter Email</h6>
            <div>
                <input v-model='email' type="text" id='email'>
                <button @click='sendEmail(email)' type="submit">Submit</button>
            </div>
    </div>
    

</template>


<script>
export default {
    props: [],
    data() {
        return {
            email: ''
        }
    },
    methods: {
        sendEmail (email) {
            const URL = `http://localhost:5000/${email}`
            fetch(URL)
                .then(response => response.json({ message: 'Thanks for signing up!' }))
        }
    }
}

</script>


<style>
.title {
    color: darkgreen;
}

.email-header {
    padding-top: 35px;
}

.subtitle {
    padding-top: 20px;
}

</style>
