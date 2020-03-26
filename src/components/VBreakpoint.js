import { extend } from 'vue-breakpoint-component';

// Default configuration:
const config = {
    breakpoints: {
        small: '(min-width: 375px)',
        medium: '(min-width: 768px)',
        large: '(min-width: 992px)',
        xlarge: '(min-width: 1200px)'
    },
    debounceTime: 100,
    experimental: false
}

const { VShowAt, VHideAt, VBreakpoint } = extend(config);

export default VBreakpoint

export { VShowAt, VHideAt, VBreakpoint }