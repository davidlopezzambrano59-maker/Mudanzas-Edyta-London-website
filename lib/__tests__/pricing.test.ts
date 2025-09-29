import { describe, test, expect } from 'vitest'
import { calculateQuote, formatCurrency, VAN_BASE_HOURLY, LOADER_HOURLY, MIN_HOURS, MILE_RATE } from '../pricing'

describe('Pricing Calculator', () => {
  describe('calculateQuote', () => {
    test('enforces 2-hour minimum', () => {
      const result = calculateQuote({
        vanSize: 'small',
        loaders: 0,
        hours: 1,
        miles: 5,
      })
      
      expect(result.billableHours).toBe(MIN_HOURS)
      expect(result.requestedHours).toBe(1)
    })

    test('uses requested hours when above minimum', () => {
      const result = calculateQuote({
        vanSize: 'small',
        loaders: 0,
        hours: 3,
        miles: 5,
      })
      
      expect(result.billableHours).toBe(3)
      expect(result.requestedHours).toBe(3)
    })

    test('calculates correct van rates', () => {
      const smallResult = calculateQuote({
        vanSize: 'small',
        loaders: 0,
        hours: 2,
        miles: 0,
      })
      expect(smallResult.vanBaseHourly).toBe(VAN_BASE_HOURLY.small)

      const mediumResult = calculateQuote({
        vanSize: 'medium',
        loaders: 0,
        hours: 2,
        miles: 0,
      })
      expect(mediumResult.vanBaseHourly).toBe(VAN_BASE_HOURLY.medium)

      const largeResult = calculateQuote({
        vanSize: 'large',
        loaders: 0,
        hours: 2,
        miles: 0,
      })
      expect(largeResult.vanBaseHourly).toBe(VAN_BASE_HOURLY.large)
    })

    test('calculates correct loader charges', () => {
      const result = calculateQuote({
        vanSize: 'medium',
        loaders: 2,
        hours: 2,
        miles: 0,
      })
      
      expect(result.loadersHourly).toBe(2 * LOADER_HOURLY)
      expect(result.baseHourly).toBe(VAN_BASE_HOURLY.medium + (2 * LOADER_HOURLY))
    })

    test('distance charge: free for 10 miles or less', () => {
      const result10 = calculateQuote({
        vanSize: 'medium',
        loaders: 0,
        hours: 2,
        miles: 10,
      })
      expect(result10.distanceCharge).toBe(0)

      const result5 = calculateQuote({
        vanSize: 'medium',
        loaders: 0,
        hours: 2,
        miles: 5,
      })
      expect(result5.distanceCharge).toBe(0)

      const result0 = calculateQuote({
        vanSize: 'medium',
        loaders: 0,
        hours: 2,
        miles: 0,
      })
      expect(result0.distanceCharge).toBe(0)
    })

    test('distance charge: £1.50 per mile for distances over 10 miles', () => {
      const result = calculateQuote({
        vanSize: 'medium',
        loaders: 0,
        hours: 2,
        miles: 10.1,
      })
      expect(result.distanceCharge).toBe(10.1 * MILE_RATE)

      const result25 = calculateQuote({
        vanSize: 'medium',
        loaders: 0,
        hours: 2,
        miles: 25,
      })
      expect(result25.distanceCharge).toBe(25 * MILE_RATE)
    })

    test('complete calculation example from requirements', () => {
      // Test case: large van, 2 loaders, 2 hours, 25 miles
      const result = calculateQuote({
        vanSize: 'large',
        loaders: 2,
        hours: 2,
        miles: 25,
      })

      const expectedBaseHourly = VAN_BASE_HOURLY.large + (2 * LOADER_HOURLY) // 50 + (2*25) = 100
      const expectedDistanceCharge = 25 * MILE_RATE // 25 * 1.5 = 37.50
      const expectedTotal = expectedBaseHourly * 2 + expectedDistanceCharge // 100*2 + 37.50 = 237.50

      expect(result.baseHourly).toBe(expectedBaseHourly)
      expect(result.billableHours).toBe(2)
      expect(result.distanceCharge).toBe(expectedDistanceCharge)
      expect(result.total).toBe(expectedTotal)
    })

    test('edge case: exactly 10 miles should be free', () => {
      const result = calculateQuote({
        vanSize: 'small',
        loaders: 0,
        hours: 2,
        miles: 10,
      })
      expect(result.distanceCharge).toBe(0)
    })

    test('edge case: just over 10 miles should charge for all miles', () => {
      const result = calculateQuote({
        vanSize: 'small',
        loaders: 0,
        hours: 2,
        miles: 10.1,
      })
      expect(result.distanceCharge).toBe(10.1 * MILE_RATE)
    })

    test('maximum loaders calculation', () => {
      const result = calculateQuote({
        vanSize: 'large',
        loaders: 3,
        hours: 2,
        miles: 0,
      })
      
      expect(result.loadersHourly).toBe(3 * LOADER_HOURLY)
      expect(result.baseHourly).toBe(VAN_BASE_HOURLY.large + (3 * LOADER_HOURLY))
    })
  })

  describe('formatCurrency', () => {
    test('formats whole numbers correctly', () => {
      expect(formatCurrency(100)).toBe('£100')
      expect(formatCurrency(50)).toBe('£50')
    })

    test('formats decimals correctly', () => {
      expect(formatCurrency(237.5)).toBe('£237.50')
      expect(formatCurrency(100.25)).toBe('£100.25')
    })

    test('handles zero correctly', () => {
      expect(formatCurrency(0)).toBe('£0')
    })
  })
})










