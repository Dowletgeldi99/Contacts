import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        contacts: [
            { name: 'Dovletgeldi', id: 1, contactItems: [{name: 'main_number', value: '+375259127577'}] },
            { name: 'Kate', id: 2, contactItems: [{name: 'main_number', value: '+375250000000'}] },
            { name: 'John', id: 3, contactItems: [{name: 'main_number', value: '+375440000000'}] }
        ]
    },
    mutations: {
        SET_CONTACT_TO_STATE(state, contact) {
            let isContactHas = false;
            
            state.contacts.map(item => {
                item.contactItems.map(el => {
                    if (el.value == contact.value) {
                        isContactHas = true;
                    }
                });
            });
                
            isContactHas || state.contacts.push({...contact});
        },
        SET_CONTACT_ITEM(state, addedContactItem) {
            state.contacts.map(item => {
                if (item.id == addedContactItem.id) {
                    item.contactItems.push(addedContactItem);
                }
            });
        },
        UPDATE_CONTACT_ITEM(state, updatedContactItem) {
            state.contacts.map(item => {
                if (item.id == updatedContactItem.id) {
                    item.contactItems.map(el => {
                        if (el.name == updatedContactItem.updateItemName) {
                            el.name = updatedContactItem.name;
                            el.value = updatedContactItem.value;
                        }
                    });
                }
            });
        },
        REMOVE_FROM_CONTACTS(state, deleteObject) {
            state.contacts.map(item => {
                if (item.id == deleteObject.id) {
                    let itemArray = item.contactItems.filter(contact => contact.name != deleteObject.name);
                    
                    item.contactItems = itemArray;
                }
            }); 
        },
        REMOVE_FROM_STATE(state, id) {
            let itemArray = state.contacts.filter(contact => contact.id != id);
            
            state.contacts = itemArray;
        }
    },
    actions: {
        ADD_TO_CONTACTS({commit}, contact) {
            commit('SET_CONTACT_TO_STATE', contact);
        },
        ADD_CONTACT_ITEM({commit}, contact) {
            commit('SET_CONTACT_ITEM', contact);
        },
        UPDATE_ITEM({commit}, contact) {
            commit('UPDATE_CONTACT_ITEM', contact);
        },
        DELETE_FROM_CONTACTS({commit}, obj) {
            commit('REMOVE_FROM_CONTACTS', obj);
        },
        DELETE_FROM_STATE({commit}, id) {
            commit('REMOVE_FROM_STATE', id);
        },
        STEP_BACK({commit}, lastState) {
            commit('STEP_BACK_STATE', lastState);
        }
    },
    getters: {
        CONTACTS(state) {
            return state.contacts;
        }
    }
});

export default store;