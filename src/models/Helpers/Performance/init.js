import { sample } from 'effector';
import { getHardwareInfo } from 'src/lib/performance';
import { AppGate } from '../../App';
import { $performanceSettings, $performanceInfo, changePerfomanceInfoFn } from '.';

$performanceInfo.watch(console.log);

$performanceSettings
  .on(changePerfomanceInfoFn, (_, performanceSettings) => performanceSettings)
  .watch((e) => console.log('performance settings', e));

sample({
  clock: AppGate.state,
  fn: getHardwareInfo,
  target: $performanceInfo,
});