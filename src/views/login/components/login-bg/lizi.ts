import * as THREE from 'three'

interface IOptions {
  el: HTMLElement
  color?: string
  top?: number
  amountX?: number
  amountY?: number
}

export class Lizi {
  el: HTMLElement
  color: string
  top: number
  amountX: number
  amountY: number
  windowHalfX: number
  mouseX: number
  count: number
  camera: THREE.PerspectiveCamera | null
  scene: THREE.Scene | null
  renderer: THREE.WebGLRenderer | null
  particles: THREE.Points | null

  constructor({ el, color = '#000', top = 350, amountX = 50, amountY = 50 }: IOptions) {
    this.el = el
    this.color = color // 控制点颜色
    this.top = top
    this.amountX = amountX
    this.amountY = amountY
    this.windowHalfX = window.innerWidth / 2
    this.mouseX = 0 // 跟踪鼠标水平位置
    this.count = 0

    this.camera = null // 相机
    this.scene = null // 场景
    this.renderer = null // 渲染器
    this.particles = null // 批量管理粒子

    this.init()
  }

  init() {
    const SEPARATION = 100
    const SCREEN_WIDTH = window.innerWidth
    const SCREEN_HEIGHT = window.innerHeight

    const container = document.createElement('div')
    container.style.position = 'relative'
    container.style.top = `${this.top}px`
    container.style.height = `${SCREEN_HEIGHT - this.top}px`
    this.el.appendChild(container)

    // 创建透视相机
    this.camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000)
    // 设置相机z轴视野
    this.camera.position.z = 1000
    // 创建场景
    this.scene = new THREE.Scene()

    const numParticles = this.amountX * this.amountY
    const positions = new Float32Array(numParticles * 3)
    const scales = new Float32Array(numParticles)

    // 初始化粒子位置和大小
    let i = 0
    let j = 0
    for (let ix = 0; ix < this.amountX; ix++) {
      for (let iy = 0; iy < this.amountY; iy++) {
        positions[i] = ix * SEPARATION - (this.amountX * SEPARATION) / 2
        positions[i + 1] = 0
        positions[i + 2] = iy * SEPARATION - (this.amountY * SEPARATION) / 2
        scales[j] = 1
        i += 3
        j++
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1))

    // 初始化粒子材质
    const material = new THREE.ShaderMaterial({
      // 设置球的颜色
      uniforms: {
        color: { value: new THREE.Color(this.color) },
      },
      // 控制球的大小
      vertexShader: `
        attribute float scale;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4( position, 2.0 );
          gl_PointSize = scale * ( 300.0 / - mvPosition.z );
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        void main() {
          if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
          gl_FragColor = vec4( color, 1.0 );
        }
      `,
    })

    this.particles = new THREE.Points(geometry, material)
    this.scene.add(this.particles)

    // 渲染器的背景色默认为黑色，设置渲染器的背景色为透明
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearAlpha(0)
    container.appendChild(this.renderer.domElement)

    window.addEventListener('resize', this.onWindowResize.bind(this), { passive: false })
    document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), { passive: false })
    document.addEventListener('touchstart', this.onDocumentTouchStart.bind(this), {
      passive: false,
    })
    document.addEventListener('touchmove', this.onDocumentTouchMove.bind(this), { passive: false })
  }

  render() {
    if (!this.camera || !this.scene || !this.particles || !this.renderer)
      return

    this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05
    this.camera.position.y = 400
    this.camera.lookAt(this.scene.position)
    const positions = this.particles.geometry.attributes.position.array
    const scales = this.particles.geometry.attributes.scale.array

    // 计算粒子位置及大小
    let i = 0
    let j = 0
    for (let ix = 0; ix < this.amountX; ix++) {
      for (let iy = 0; iy < this.amountY; iy++) {
        positions[i + 1]
          = Math.sin((ix + this.count) * 0.3) * 100 + Math.sin((iy + this.count) * 0.5) * 100
        scales[j]
          = (Math.sin((ix + this.count) * 0.3) + 1) * 8 + (Math.sin((iy + this.count) * 0.5) + 1) * 8
        i += 3
        j++
      }
    }
    // 重新渲染粒子
    this.particles.geometry.attributes.position.needsUpdate = true
    this.particles.geometry.attributes.scale.needsUpdate = true
    this.renderer.render(this.scene, this.camera)
    this.count += 0.1
  }

  animate() {
    window.requestAnimationFrame(() => this.animate())
    this.render()
  }

  onWindowResize() {
    if (!this.camera || !this.renderer)
      return
    this.windowHalfX = window.innerWidth / 2
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  onDocumentMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX - this.windowHalfX
  }

  onDocumentTouchStart(event: TouchEvent) {
    if (event.touches.length === 1)
      this.mouseX = event.touches[0].pageX - this.windowHalfX
  }

  onDocumentTouchMove(event: TouchEvent) {
    if (event.touches.length === 1) {
      event.preventDefault()
      this.mouseX = event.touches[0].pageX - this.windowHalfX
    }
  }
}
