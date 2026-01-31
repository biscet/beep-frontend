import { sample } from 'effector';
import { getHardwareInfo } from 'src/lib/performance';
import { AppGate } from '../../App';
import { $performanceSettings, $performanceInfo, changePerfomanceInfoFn } from '.';

$performanceSettings.on(changePerfomanceInfoFn, (_, performanceSettings) => performanceSettings);

sample({
  clock: AppGate.state,
  fn: getHardwareInfo,
  target: $performanceInfo,
});
