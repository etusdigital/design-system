import type { App, Plugin } from 'vue';
import BSideMenu from './BSideMenu.vue';

// Re-export types from MenuItem utils and tree navigation
export type { Item as BSideMenuItem, BSideMenuAccessibilityConfig } from "../../utils/types/MenuItem";
export type { TreeNode, TreeNavigationOptions } from "#composables/useTreeNavigation";

export default {
    install(Vue: App) {
        Vue.component('BSideMenu', BSideMenu);
    },
} as Plugin;

export {
    BSideMenu,
}
