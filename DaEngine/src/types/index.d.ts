// import type { Question, Answers } from 'inquirer'
// import { BUILD_TOOLS } from './questions/build-tools'

// interface FeatFile {
//   readonly path: string
//   readonly data: (() => string) | string
// }

// type DepType = 'default' | 'dev' | 'peer'

// interface FeatDep {
//   readonly name: string
//   readonly type: DepType
// }

// interface FeatureData {
//   readonly fileCollection?: FeatFile[]
//   readonly depCollection?: FeatDep[]
// }

// export interface QuestionAnswers extends Answers {
//   readonly buildTool?: BUILD_TOOLS
//   readonly isReactNeeded?: boolean
// }

// export interface FeatureContext {
//   readonly rootPath: string
//   answers: QuestionAnswers
// }

// export interface QuestionBuilder {
//   (context: FeatureContext): Promise<Question | Question[] | void | null>
// }

// export interface IsSkipFeature {
//   (context: FeatureContext): Promise<boolean>
// }

// export interface FeatureSetup {
//   (context: FeatureContext): Promise<FeatureData | void>
// }

// export interface FeatureModule extends Record<string, unknown> {
//   readonly questionsBuilder?: QuestionBuilder
//   readonly isSkip?: IsSkipFeature
//   readonly setup: FeatureSetup
//   readonly teardown?: (context: FeatureContext) => Promise<void>
// }

enum Flag {
  defined = 1,
  required
}

export interface Module {
  status: Flag,
  factory: Function,
  exports?: Object // 该模块假如已经被require过，则该属性上挂载对应的模块代码，以节省重复计算的开销  
}