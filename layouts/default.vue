<template>
  <div>
    <nav
      class="navbar header is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a
          class="navbar-item"
          href="/"
        >
          <img
            src="~assets/logo.png"
            alt="Schrodinger Hat"
            height="28"
          >
        </a>

        <div class="navbar-burger">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start" />
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a id="info-btn" class="button is-info" @click="showInfoModal"><span class="icon info-icon">&#x1f6c8;</span><strong>How to</strong></a>
              <a id="save-btn" class="button is-primary"><span class="icon">💾</span><strong>Download</strong></a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <nuxt />
  </div>
</template>
<script>
import ModalCard from '../components/ModalCard'

export default {
  mounted () {
    this.showInfoModal()
  },
  methods: {
    showInfoModal () {
      this.$buefy.modal.open({
        parent: this,
        component: ModalCard,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true
      })
    }
  }
}
</script>
