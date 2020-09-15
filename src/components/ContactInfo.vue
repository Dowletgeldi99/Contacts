<template>
    <div class="contact-info">
        <div class="contact-info_title">
            <h3>{{ getContact.name }}</h3>
            <div v-for="item in getContact.contactItems" class="contactNumberBlock" :key="item.value">
                <p><strong>{{item.name}}:</strong> {{ item.value }}</p>
                <div>
                    <button :id="item.name" class="button" @click="deleteItem">Delete item</button> 
                    <button class="button" @click="displayPopupUpdate(item.name)">Update item</button>
                </div>
            </div>
        </div>

        <div class="contact-info_buttons">
            <button class="button" @click="showModal = true, popup = 1">Add item</button>
        </div>

        <transition name = "fade" appear>
            <div class="modal-overlay" v-if="showModal">
                <button class="exit-btn" @click="exitPopup"></button>
                <div class="modal" v-if="showModal">
                    <div class="modal-form" v-if="!succsessPost">
                        <div class="modal-title">
                            <p>Input your contact data</p>
                        </div>
                        <div class="popup-form" v-if="popup">
                            <label for="inputKey">Key</label>
                            <input type="text" id="inputKey" name="key" v-model="addedItem.name">
                            <label for="inputValue">Value</label>
                            <input type="text" id="inputValue" name="value" v-model="addedItem.value">

                            <p v-if="errors.length">
                                <b>Пожалуйста исправьте указанные ошибки:</b>
                                <ul class="error_ul">
                                    <li v-for="error in errors" :key="error.id">{{ error }}</li>
                                </ul>
                            </p>
                            <button class="button" @click="checkForm">Add</button>
                        </div>
                        <div class="popup-form" v-if="!popup">
                            <label for="inputKey">Key</label>
                            <input type="text" id="inputKey" name="key" v-model="addedItem.name">
                            <label for="inputValue">Value</label>
                            <input type="text" id="inputValue" name="value" v-model="addedItem.value">

                            <p v-if="errors.length">
                                <b>Пожалуйста исправьте указанные ошибки:</b>
                                <ul class="error_ul">
                                    <li v-for="error in errors" :key="error.id">{{ error }}</li>
                                </ul>
                            </p>

                            <div class="buttons">
                                <button class="button" @click="canselUpdate">Cansel</button>
                                <button class="button" @click="checkForm">Update</button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-succsess" v-else>
                        <h4>Contact item is added!</h4>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        data() {
            return {
                addedItem: {
                    name: '',
                    value: ''
                },
                showModal: false,
                succsessPost: false,
                errors: [],
                popup: 1,
                updateItemName: ''
            }
        },
        computed: {
            ...mapGetters([
                'CONTACTS'
            ]),
            getContact: function() {
                for (let i = 0; i < this.CONTACTS.length; i++) {
                    if (this.CONTACTS[i].id == this.$route.params.id) {
                        return this.CONTACTS[i];
                    }
                }
            }
        },
        methods: {
            ...mapActions([
                'ADD_CONTACT_ITEM',
                'DELETE_FROM_CONTACTS',
                'UPDATE_ITEM'
            ]),
            checkForm: function (e) {
               if (this.addedItem.name && this.addedItem.value) {
                    if (this.popup) {
                        this.addContactItem();
                        this.succsessPost = true;
                    } else {
                        this.updateContactItem();
                    }
                }

                this.errors = [];

                if (!this.addedItem.name) {
                    this.errors.push('You have to write right name of contact item');
                }

                if (!this.addedItem.value) {
                    this.errors.push('You have to write right value of contact value');
                }
            },
            deleteItem() {
                let isConfirm = confirm(`Do you want to delete ${event.target.id} ?`);
                
                if (isConfirm) {
                    this.$store.dispatch('DELETE_FROM_CONTACTS', {
                        id: this.getContact.id,
                        name: event.target.id
                    });
                }
            },
            exitPopup() {
                this.showModal = false;
                this.succsessPost = false;
                this.addedItem = {
                    name: null,
                    value: null,
                    id: null
                }
            },
            canselUpdate() {
                let isConfirm = confirm('Do you want cansel ?');

                if (isConfirm) {
                    this.exitPopup();
                }
            },
            addContactItem() {
                this.addedItem.id = this.getContact.id;
                this.ADD_CONTACT_ITEM(this.addedItem);
            },
            updateContactItem() {
                this.addedItem.id = this.getContact.id;
                this.addedItem.updateItemName = this.updateItemName;
                this.UPDATE_ITEM(this.addedItem)
                .then(
                    this.exitPopup()
                );
            },
            displayPopupUpdate(key) {
                this.showModal = true;
                this.popup = 0;
                this.updateItemName = key;
            }
        }
    }
</script>

<style lang="scss">
    .contact-info {
        width: 50%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #ccc;
        padding: 20px;

        &_title {
            width: 100%;
            text-align: center;
            padding-left: 25px;
            padding-right: 25px;

            .contactNumberBlock {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 15px;
                box-shadow: 0 2px 7px #000;
                padding: 15px;

                button {
                    padding: 10px;
                }
            }
        }

        .added-items {
            width: 100%;
            padding-left: 25px;
            padding-right: 25px;

            .added-item {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 15px;
                box-shadow: 0 2px 7px #000;
                padding: 15px;

                button {
                    padding: 10px;
                }
            }
        }

        &_buttons {
            width: 90%;
            display: flex;
            justify-content: center;
            margin-top: 50px;
        }

        .button {
            color: #fff;
            background: #0f73ee;
            padding: 15px 30px;
            border-radius: 20px;
            border: 0;
            outline: none;
            transition: 0.4 ease-out;
            font-weight: 600;
            cursor: pointer;
        }

        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 20;
            background-color: rgba($color: #000000, $alpha: .5);
            
            .exit-btn {
                position: fixed;
                top: 30px;
                right: 30px;
                width: 20px;
                height: 20px;
                background: transparent;
                border: none;
                outline: none;
                cursor: pointer;

                &::before {
                    content: "X";
                    font-family: sans-serif;
                    width: 20px;
                    height: 20px;
                    text-align: center;
                    font-size: 22px;
                    color: #fff;
                }
            }
            
            .modal {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 400px;
                background-color: #fff;
                border-radius: 5px;
                padding: 25px;

                .modal-succsess {
                    text-align: center;
                }


                .modal-title {
                    text-align: center;

                    p {
                        font-size: 20px;
                        font-weight: 600;
                        font-family: sans-serif;
                    }

                }

                .popup-form {
                    display: flex;
                    flex-direction: column;
                    padding: 20px 20px 5px 20px;
                    
                    label {
                        text-align: left;
                    }

                    input {
                        border: none;
                        border-bottom: 2px solid #ccc;
                        margin-bottom: 20px;
                        margin-top: 5px;
                        outline: none;
                        transition: .5s ease;
                        font-size: 20px;

                        &:focus {
                            border-bottom: 2px solid #0f73ee;
                            transition: 1s ease;
                        }
                    }

                    input::-webkit-outer-spin-button,
                    input::-webkit-inner-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }

                    .error_ul {
                        li {
                            list-style: none;
                            color: red;
                            margin-bottom: 15px;
                        }

                        li:first-child {
                            margin-top: 10px;
                        }
                    }

                    .buttons {
                        display: flex;
                        justify-content: space-between;
                    }

                    .button {
                        color: #fff;
                        background: #0f73ee;
                        padding: 15px 30px;
                        border-radius: 20px;
                        border: 0;
                        outline: none;
                        transition: 0.4 ease-out;
                        font-weight: 600;
                    }
                }
            }

        }

        .fade-enter-active,
        .fade-leave-active {
            transition: opacity .5s; 
        }

        .fade-enter,
        .fade-leave-to {
            opacity: 0;
        }
    }
</style>