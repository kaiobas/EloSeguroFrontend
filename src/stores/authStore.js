import { defineStore } from 'pinia'

const defaultMockUser = {
  id: 1,
  name: 'Responsável Demo',
  email: 'responsavel@email.com',
  password: '123456',
  phone: '(65) 99999-9999',
  documentType: 'cpf',
  documentNumber: '000.000.000-00',
  securityPhrase: 'elo seguro',
  contractSigned: false,
  termsAccepted: false,
  contractVersion: null,
  contractAcceptedAt: null,
  signedContractContent: null
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,

    user: null,

    registeredUser: {
      ...defaultMockUser
    },

    pendingLoginUser: null,

    firstStepAuthenticated: false,

    secondStepAuthenticated: false
  }),

  getters: {
    isAuthenticated: (state) => {
      return !!state.token && state.secondStepAuthenticated
    },

    hasAcceptedContract: (state) => {
      return !!state.user?.contractSigned && !!state.user?.termsAccepted
    },

    needsSecurityVerification: (state) => {
      return state.firstStepAuthenticated && !state.secondStepAuthenticated
    }
  },

  actions: {
    registerResponsible(payload) {
      this.registeredUser = {
        id: 1,
        name: payload.name,
        email: payload.email,
        password: payload.password,
        phone: payload.phone,
        documentType: payload.documentType,
        documentNumber: payload.documentNumber,
        securityPhrase: payload.securityPhrase.trim().toLowerCase(),
        contractSigned: false,
        termsAccepted: false,
        contractVersion: null,
        contractAcceptedAt: null,
        signedContractContent: null
      }

      this.pendingLoginUser = this.registeredUser
      this.firstStepAuthenticated = true
      this.secondStepAuthenticated = true
      this.token = 'mock-token'
      this.user = this.registeredUser
    },

    loginFirstStep({ email, password }) {
      const emailMatches = email === this.registeredUser.email
      const passwordMatches = password === this.registeredUser.password

      if (!emailMatches || !passwordMatches) {
        throw new Error('E-mail ou senha inválidos.')
      }

      this.pendingLoginUser = this.registeredUser
      this.firstStepAuthenticated = true
      this.secondStepAuthenticated = false
      this.token = null
      this.user = null
    },

    verifySecurityPhrase(phrase) {
      if (!this.pendingLoginUser) {
        throw new Error('Nenhum login em andamento.')
      }

      const typedPhrase = phrase.trim().toLowerCase()
      const correctPhrase = this.pendingLoginUser.securityPhrase.trim().toLowerCase()

      if (typedPhrase !== correctPhrase) {
        throw new Error('Frase de segurança incorreta.')
      }

      this.token = 'mock-token'
      this.user = this.pendingLoginUser
      this.secondStepAuthenticated = true
    },

    acceptContract(payload) {
      this.user = {
        ...this.user,
        contractSigned: true,
        termsAccepted: true,
        contractVersion: payload.contractVersion,
        contractAcceptedAt: new Date().toISOString(),
        signedContractContent: payload.contractContent
      }

      this.registeredUser = {
        ...this.registeredUser,
        contractSigned: true,
        termsAccepted: true,
        contractVersion: payload.contractVersion,
        contractAcceptedAt: new Date().toISOString(),
        signedContractContent: payload.contractContent
      }
    },

    refuseContract() {
      this.user = {
        ...this.user,
        contractSigned: false,
        termsAccepted: false
      }
    },

    cancelPendingLogin() {
      this.pendingLoginUser = null
      this.firstStepAuthenticated = false
      this.secondStepAuthenticated = false
      this.token = null
      this.user = null
    },

    logout() {
      this.token = null
      this.user = null
      this.pendingLoginUser = null
      this.firstStepAuthenticated = false
      this.secondStepAuthenticated = false
    }
  }
})
