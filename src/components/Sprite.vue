<template lang="html">
  <div class="sprite" :class="spriteClass" :style="style">
    <img v-if="options.type === 'image'" :src="options.src" alt="">
    <div class="form" v-if="options.type === 'form'">
    </div>
    <span v-if="options.type === 'text'"> {{ options.text }} </span>
    <form-item v-if="options.type === 'form'"></form-item>
    <dynamic-text v-if="options.type === 'dtext'" :active="isActive" :text="options.text" :delay="options.delay"></dynamic-text>
  </div>
</template>

<script>
import DynamicText from './DynamicText.vue'
import Form from './Form.vue'
export default {
  props: [
    'options',
    'isActive'
  ],
  data() {
    return {
      style: {
        left: this.options.left,
        right: this.options.right,
        top: this.options.top,
        bottom: this.options.bottom,
        width: this.options.width,
        height: this.options.height,
        backgroundColor: this.options.backgroundColor,
        animationDuration: this.options.animationDuration,
        animationDelay: this.options.animationDelay,
        fontSize: this.options.fontSize,
        fontWeight: this.options.fontWeight,
        color: this.options.color
      }
    }
  },
  computed: {
    spriteClass() {
      let spriteClass = {
        animated: this.isActive,
        dismiss: !this.isActive
      }
      this.options.animateName && (spriteClass[this.options.animateName] = this.isActive)
      return spriteClass
    }
  },
  components: {
    'dynamic-text': DynamicText,
    'form-item': Form
  }
}
</script>

<style lang="css">
.sprite {
  position: absolute;
}
.sprite img {
  display: block;
  width: 100%;
  height: 100%;
}
.sprite.dismiss {
  opacity: 0;
}

.leafDown {
  /*transform: translate3d(4.9rem,3rem,0) rotate(-120deg);
  transition: all 2s linear;
  transition-delay: 1s;*/
  animation-name: leafDown;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
}

@keyframes leafDown {
  from {
    transform: rotate(-60deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  to {
    top: 6rem;
    left:5rem;
    transform: rotate(-120deg) scale(0.7);
    opacity: 0.2;
  }
}

.shine {
  animation-name: shine;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
}
@keyframes shine {
  0% {
  opacity: 0; }
1% {
  opacity: 0.00099; }
2% {
  opacity: 0.00394; }
3% {
  opacity: 0.00886; }
4% {
  opacity: 0.01571; }
5% {
  opacity: 0.02447; }
6% {
  opacity: 0.03511; }
7% {
  opacity: 0.04759; }
8% {
  opacity: 0.06185; }
9% {
  opacity: 0.07784; }
10% {
  opacity: 0.09549; }
11% {
  opacity: 0.11474; }
12% {
  opacity: 0.13552; }
13% {
  opacity: 0.15773; }
14% {
  opacity: 0.18129; }
15% {
  opacity: 0.20611; }
16% {
  opacity: 0.23209; }
17% {
  opacity: 0.25912; }
18% {
  opacity: 0.28711; }
19% {
  opacity: 0.31594; }
20% {
  opacity: 0.34549; }
21% {
  opacity: 0.37566; }
22% {
  opacity: 0.40631; }
23% {
  opacity: 0.43733; }
24% {
  opacity: 0.4686; }
25% {
  opacity: 0.5; }
26% {
  opacity: 0.5314; }
27% {
  opacity: 0.56267; }
28% {
  opacity: 0.59369; }
29% {
  opacity: 0.62434; }
30% {
  opacity: 0.65451; }
31% {
  opacity: 0.68406; }
32% {
  opacity: 0.71289; }
33% {
  opacity: 0.74088; }
34% {
  opacity: 0.76791; }
35% {
  opacity: 0.79389; }
36% {
  opacity: 0.81871; }
37% {
  opacity: 0.84227; }
38% {
  opacity: 0.86448; }
39% {
  opacity: 0.88526; }
40% {
  opacity: 0.90451; }
41% {
  opacity: 0.92216; }
42% {
  opacity: 0.93815; }
43% {
  opacity: 0.95241; }
44% {
  opacity: 0.96489; }
45% {
  opacity: 0.97553; }
46% {
  opacity: 0.98429; }
47% {
  opacity: 0.99114; }
48% {
  opacity: 0.99606; }
49% {
  opacity: 0.99901; }
50% {
  opacity: 1;
  transform: scale(1.5);
}
51% {
  opacity: 0.99901; }
52% {
  opacity: 0.99606; }
53% {
  opacity: 0.99114; }
54% {
  opacity: 0.98429; }
55% {
  opacity: 0.97553; }
56% {
  opacity: 0.96489; }
57% {
  opacity: 0.95241; }
58% {
  opacity: 0.93815; }
59% {
  opacity: 0.92216; }
60% {
  opacity: 0.90451; }
61% {
  opacity: 0.88526; }
62% {
  opacity: 0.86448; }
63% {
  opacity: 0.84227; }
64% {
  opacity: 0.81871; }
65% {
  opacity: 0.79389; }
66% {
  opacity: 0.76791; }
67% {
  opacity: 0.74088; }
68% {
  opacity: 0.71289; }
69% {
  opacity: 0.68406; }
70% {
  opacity: 0.65451; }
71% {
  opacity: 0.62434; }
72% {
  opacity: 0.59369; }
73% {
  opacity: 0.56267; }
74% {
  opacity: 0.5314; }
75% {
  opacity: 0.5; }
76% {
  opacity: 0.4686; }
77% {
  opacity: 0.43733; }
78% {
  opacity: 0.40631; }
79% {
  opacity: 0.37566; }
80% {
  opacity: 0.34549; }
81% {
  opacity: 0.31594; }
82% {
  opacity: 0.28711; }
83% {
  opacity: 0.25912; }
84% {
  opacity: 0.23209; }
85% {
  opacity: 0.20611; }
86% {
  opacity: 0.18129; }
87% {
  opacity: 0.15773; }
88% {
  opacity: 0.13552; }
89% {
  opacity: 0.11474; }
90% {
  opacity: 0.09549; }
91% {
  opacity: 0.07784; }
92% {
  opacity: 0.06185; }
93% {
  opacity: 0.04759; }
94% {
  opacity: 0.03511; }
95% {
  opacity: 0.02447; }
96% {
  opacity: 0.01571; }
97% {
  opacity: 0.00886; }
98% {
  opacity: 0.00394; }
99% {
  opacity: 0.00099;
  transform: scale(1);
}
100% {
  opacity: 0; }
}
</style>
