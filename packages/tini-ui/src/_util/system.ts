export function getSystemInfoAsync(): Promise<my.IGetSystemInfoSuccessResult> {
  return new Promise((resolve) => {
    my.getSystemInfo({
      success: (res) => {
        resolve(res);
      },
    });
  });
}
