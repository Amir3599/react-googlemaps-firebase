import { firebaseConfig } from '../../common/constants'

export function apiSrcModifier(funcName: string): string {
    return `https://${firebaseConfig.projectId}.cloudfunctions.net/${funcName}`
}