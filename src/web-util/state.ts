import { type Dispatch } from "react"
import { type SetStateAction } from "react"

export type State<T1> = [T1, Dispatch<SetStateAction<T1>>];