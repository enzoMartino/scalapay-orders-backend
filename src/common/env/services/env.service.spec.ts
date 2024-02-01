import { EnvService } from './env.service';
import { ConfigService } from '@nestjs/config';
import { mock } from 'jest-mock-extended';

describe('EnvService', () => {
  const configService = mock<ConfigService>();
  const service = new EnvService(configService);

  describe('getScalapayOrdersUrl', () => {
    const scalapayApisHostname = 'scalapayApisHostname';
    const scalapayApisVersion = 'scalapayApisVersion';
    const scalapayOrdersApisEndpoint = 'scalapayOrdersApisEndpoint';

    beforeEach(() => {
      configService.get.mockReturnValueOnce(scalapayApisHostname);
      configService.get.mockReturnValueOnce(scalapayApisVersion);
      configService.get.mockReturnValueOnce(scalapayOrdersApisEndpoint);
    });

    it('should return the right url', () => {
      const expected = `${scalapayApisHostname}/${scalapayApisVersion}/${scalapayOrdersApisEndpoint}`;

      const result = service.getScalapayOrdersUrl();

      expect(result).toStrictEqual(expected);
    });
  });
});
