<template>
    <div class="contacts">
        <h1>Contacts</h1>
        <div v-if="CONTACTS.length" class="contacts-list">
            <div v-for="contact in CONTACTS" class="contact-block" :key="contact.id">
                <h4>{{contact.name}}</h4>
                <div v-if="contact.contactItems.length">
                    <p v-for="item in contact.contactItems" :key="item.value">{{ item.value }}</p>
                </div>
                <div>
                    <router-link class="button btnRouter" :to="{ name: 'contactInfo', params: { id: contact.id }}">Info</router-link>
                    <button @click="deleteContact(contact.id)" class="button">Delete</button>
                </div>
            </div>
        </div>
        <div v-else>
            Contacts list is empty!
        </div>

        <div class="contact-add">
            <h2>Add contact</h2>
            <label>
                <input type="name" name="name" v-model="contact.name" placeholder="Name">
            </label>
            <label>
                <input type="number" name="value" v-model="contact.contactItems[0].value" placeholder="Phone number">
            </label>
            <button class="button" @click="addContact">Add</button>
        </div>

    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        data() {
            return {
                contact: {
                    name: '',
                    contactItems: [
                        {name: 'main_number', value: ''}
                    ]
                }
            }
        },
        computed: {
            ...mapGetters([
                'CONTACTS'
            ]) 
        },
        mounted() {
            
        },
        methods: {
            ...mapActions([
                'ADD_TO_CONTACTS',
                'DELETE_FROM_STATE'
            ]),
            addContact() {
                this.contact.id = Math.random().toString(30).substr(2, 9);
                this.ADD_TO_CONTACTS(this.contact);
            },
            deleteContact(id) {
                let isConfirm = confirm(`Do you want to delete ?`);
                
                if (isConfirm) {
                    this.$store.dispatch('DELETE_FROM_STATE', id);
                }
            }
        }
    }
</script>

<style lang="scss">
    .contacts {
        width: 80%;
        margin: 0 auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h1 {
            margin-bottom: 30px;
        }

        &-list {
            width: 100%;
            flex-wrap: wrap;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            .contact-block {
                // max-width: 30%;
                width: 30%;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 10px;
                border: 1px solid #000;
                margin-top: 20px;

                p {
                    margin: 15px 0;
                }
            }
        }

        .contact-add {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 50px;

            h2 {
                margin-bottom: 15px;
            }

            label {
                margin-bottom: 10px;
            }
        }
    }

    .button {
        color: #fff;
        background: #0f73ee;
        padding: 5px 10px;
        border-radius: 20px;
        border: 0;
        outline: none;
        transition: 0.4 ease-out;
        font-weight: 600;
        cursor: pointer;
        text-align: center;
    }

    .btnRouter{
        padding: 4px 10px;
        text-decoration: none;
    }
</style>