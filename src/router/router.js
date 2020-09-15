import Vue from "vue";
import Router from 'vue-router';
import Contacts from '../components/Contacts';
import ContactInfo from '../components/ContactInfo';

Vue.use(Router);

const router =  new Router({
    routes: [
        {
            path: '/',
            name: 'contacts',
            component: Contacts
        },
        {   path: '/contact/:id',
            name: 'contactInfo',
            component: ContactInfo
        }
    ]
});

export default router;