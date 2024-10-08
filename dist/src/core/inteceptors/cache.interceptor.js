"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomCacheInterceptor = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const load_package_util_1 = require("@nestjs/common/utils/load-package.util");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const core_1 = require("@nestjs/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let CustomCacheInterceptor = class CustomCacheInterceptor {
    constructor(cacheManager, reflector) {
        this.cacheManager = cacheManager;
        this.reflector = reflector;
        this.allowedMethods = ['GET'];
        const cacheManagerPackage = (0, load_package_util_1.loadPackage)('cache-manager', 'CacheModule', () => require('cache-manager'));
        this.cacheManagerIsv5OrGreater = 'memoryStore' in cacheManagerPackage;
    }
    async intercept(context, next) {
        var _a, _b;
        const key = this.trackBy(context);
        const ttlValueOrFactory = (_b = (_a = this.reflector.get(common_1.CACHE_TTL_METADATA, context.getHandler())) !== null && _a !== void 0 ? _a : this.reflector.get(common_1.CACHE_TTL_METADATA, context.getClass())) !== null && _b !== void 0 ? _b : null;
        if (!key) {
            return next.handle();
        }
        try {
            const value = await this.cacheManager.get(key);
            if (!(0, shared_utils_1.isNil)(value)) {
                return (0, rxjs_1.of)(value);
            }
            const ttl = (0, shared_utils_1.isFunction)(ttlValueOrFactory)
                ? await ttlValueOrFactory(context)
                : ttlValueOrFactory;
            return next.handle().pipe((0, operators_1.tap)(async (response) => {
                if (response instanceof common_1.StreamableFile) {
                    return;
                }
                const args = [key, response];
                if (!(0, shared_utils_1.isNil)(ttl)) {
                    args.push(this.cacheManagerIsv5OrGreater ? ttl : { ttl });
                }
                try {
                    await this.cacheManager.set(...args);
                }
                catch (err) {
                    common_1.Logger.error(`An error has occurred when inserting "key: ${key}", "value: ${response}"`, err.stack, 'CacheInterceptor');
                }
            }));
        }
        catch (_c) {
            return next.handle();
        }
    }
    trackBy(context) {
        const httpAdapter = this.httpAdapterHost.httpAdapter;
        const isHttpApp = httpAdapter && !!httpAdapter.getRequestMethod;
        const cacheMetadata = this.reflector.get(common_1.CACHE_KEY_METADATA, context.getHandler());
        if (!isHttpApp || cacheMetadata) {
            return cacheMetadata;
        }
        const request = context.getArgByIndex(0);
        if (!this.isRequestCacheable(context)) {
            return undefined;
        }
        return httpAdapter.getRequestUrl(request);
    }
    isRequestCacheable(context) {
        const req = context.switchToHttp().getRequest();
        return this.allowedMethods.includes(req.method);
    }
};
__decorate([
    (0, common_1.Optional)(),
    (0, common_1.Inject)(),
    __metadata("design:type", core_1.HttpAdapterHost)
], CustomCacheInterceptor.prototype, "httpAdapterHost", void 0);
CustomCacheInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, core_1.Reflector])
], CustomCacheInterceptor);
exports.CustomCacheInterceptor = CustomCacheInterceptor;
//# sourceMappingURL=cache.interceptor.js.map