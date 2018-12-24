import { Request, Response } from 'express';
import * as accessData from '../../access-routes.json';
import { ApiConstants } from '../constants';

abstract class BaseRouter {
    public constructor() {

    }

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<T>}
     */
    public checkAccessRoute(req: Request, res: Response): Promise<any> {
        return new Promise((resolve, reject) => {
            this.checkRoute(req)
                .then(() => {
                    return resolve();
                })
                .catch((err: any) => {
                    res.status(ApiConstants.STATUS_NOT_FOUND).send({
                        'status': ApiConstants.STATUS_NOT_FOUND,
                        'message': ApiConstants.MESSAGE_OBJECT_NOT_FOUND,
                    });

                    return reject();
                });
        });
    }

    /**
     *
     * @param req
     * @returns {Promise<T>}
     */
    private checkRoute(req: Request): Promise<any> {
        return new Promise((resolve, reject) => {
            const routes = (<any>accessData);

            const methodName: string = req.method.toLowerCase();
            let url = req.originalUrl.replace(/[0-9]+/g, ':number');
            url = this.removeLastElementFromUrlIfNeeded(url);
            url = this.removeSlicedQueryParametersIfExist(url);

            const urls: string[] = url.split('/');
            const routeName = urls[1];

            urls.splice(0, 2);
            const urlWithoutRoute: string = urls.join('/');

            if (routes[routeName] && routes[routeName][methodName]) {
                for (const route in routes[routeName][methodName]) {
                    if (route === urlWithoutRoute) {
                        if (routes[routeName][methodName][route] > 0) {
                            return resolve();
                        }

                        return reject();
                    }
                }
            }

            return reject();
        });
    }

    /**
     *
     * @param url
     * @returns {string}
     */
    private removeLastElementFromUrlIfNeeded(url: string): string {
        if (url[url.length - 1] === '/') {
            url = url.substring(0, url.length - 1);
        }

        return url;
    }

    /**
     *
     * @param url
     * @returns {string}
     */
    private removeSlicedQueryParametersIfExist(url: string): string {
        const indexOfMark = url.indexOf('?');
        if (indexOfMark > 0) {
            url = url.substring(0, indexOfMark);

            return url;
        }

        return url;
    }
}

export default BaseRouter;