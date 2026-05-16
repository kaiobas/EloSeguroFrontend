const routes = [
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '/',
        name: 'login',
        component: () => import('pages/auth/LoginPage.vue')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('pages/auth/LoginPage.vue')
      },
      {
        path: '/cadastro',
        name: 'register',
        component: () => import('pages/auth/RegisterPage.vue')
      },
      {
        path: '/aceite-termos',
        name: 'contract-acceptance',
        component: () => import('pages/contract/ContractAcceptancePage.vue')
      },
      {
        path: '/acesso-bloqueado',
        name: 'contract-blocked',
        component: () => import('pages/contract/ContractBlockedPage.vue')
      },
      {
        path: '/verificacao-seguranca',
        name: 'security-word',
        component: () => import('pages/auth/SecurityWordPage.vue')
      }
    ]
  },

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/dashboard'
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('pages/modulos/DashboardPage.vue')
      },
      {
        path: '/alertas',
        name: 'alerts',
        component: () => import('pages/modulos/AlertsPage.vue')
      },
      {
        path: '/criancas',
        name: 'children',
        component: () => import('pages/modulos/ChildrenPage.vue')
      },
      {
        path: '/dispositivos',
        name: 'devices',
        component: () => import('pages/modulos/DevicesPage.vue')
      },
      {
        path: '/mais',
        name: 'more',
        component: () => import('pages/modulos/MorePage.vue')
      },
      {
        path: '/evidencias',
        name: 'evidence',
        component: () => import('pages/modulos/EvidencePage.vue')
      },
      {
        path: '/orientacoes',
        name: 'guidance',
        component: () => import('pages/modulos/GuidancePage.vue')
      },
      {
        path: '/conversa-segura',
        name: 'safe-conversation',
        component: () => import('pages/modulos/SafeConversationPage.vue')
      },
      {
        path: '/privacidade',
        name: 'privacy',
        component: () => import('pages/modulos/PrivacyPage.vue')
      },
      {
        path: '/perfil',
        name: 'profile',
        component: () => import('pages/modulos/ProfilePage.vue')
      }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
