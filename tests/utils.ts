import {
  COMQUEST_FAILURE,
  COMQUEST_MAGIC_SYMBOL,
  COMQUEST_REQUEST,
  COMQUEST_SUCCESS,
} from '../src/constants';
import {
  isComquestAction,
  isComquestFailureAction,
  isComquestSuccessAction,
} from '../src/utils';

describe('utils', () => {
  describe('isComquestAction', () => {
    it('returns true if an action is a comquest action', () => {
      expect(isComquestAction(undefined as any)).toBe(false);
      expect(isComquestAction(null as any)).toBe(false);
      expect(isComquestAction({} as any)).toBe(false);
      expect(isComquestAction({ meta: {} } as any)).toBe(false);
      expect(isComquestAction({ meta: { comquest: Symbol() } } as any)).toBe(
        false
      );
      expect(
        isComquestAction({
          meta: {
            comquest: COMQUEST_MAGIC_SYMBOL,
          },
        })
      ).toBe(true);
    });
  });

  describe('isComquestFailureAction', () => {
    it('returns true if an action is a comquest failure action', () => {
      expect(isComquestFailureAction(undefined as any)).toBe(false);
      expect(isComquestFailureAction(null as any)).toBe(false);
      expect(isComquestFailureAction({} as any)).toBe(false);
      expect(isComquestFailureAction({ meta: {} } as any)).toBe(false);
      expect(
        isComquestFailureAction({ meta: { comquest: Symbol() } } as any)
      ).toBe(false);
      expect(
        isComquestFailureAction({
          meta: {
            comquest: COMQUEST_MAGIC_SYMBOL,
            type: COMQUEST_REQUEST,
          },
        } as any)
      ).toBe(false);
      expect(
        isComquestFailureAction({
          meta: {
            comquest: COMQUEST_MAGIC_SYMBOL,
            type: COMQUEST_FAILURE,
          },
        })
      ).toBe(true);
    });
  });

  describe('isComquestSuccessAction', () => {
    it('returns true if an action is a comquest success action', () => {
      expect(isComquestSuccessAction(undefined as any)).toBe(false);
      expect(isComquestSuccessAction(null as any)).toBe(false);
      expect(isComquestSuccessAction({} as any)).toBe(false);
      expect(isComquestSuccessAction({ meta: {} } as any)).toBe(false);
      expect(
        isComquestSuccessAction({ meta: { comquest: Symbol() } } as any)
      ).toBe(false);
      expect(
        isComquestSuccessAction({
          meta: {
            comquest: COMQUEST_MAGIC_SYMBOL,
            type: COMQUEST_REQUEST,
          },
        } as any)
      ).toBe(false);
      expect(
        isComquestSuccessAction({
          meta: {
            comquest: COMQUEST_MAGIC_SYMBOL,
            type: COMQUEST_SUCCESS,
          },
        })
      ).toBe(true);
    });
  });
});
