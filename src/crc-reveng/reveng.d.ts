/// <reference types='emscripten' />

export interface Module extends EmscriptenModule {
  thisProgram: string
}

declare const factory: EmscriptenModuleFactory<Module>

export default factory
