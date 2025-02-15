import * as vocabRepository from './vocab.repository';
import { IVocab } from '~/interfaces/IVocab';
export const getAllVocab = async (): Promise<IVocab[]> => {
    return await vocabRepository.getAllVocab();
};