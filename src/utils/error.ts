export class APIError {
    private target: string;
    private _source: string;
    private _reason: string;
    private _details: string;

    constructor(
        target: string,
        source?: string,
        reason?: string,
        details?: string
    ){
        this.target = target;
        this._source = source;
        this._reason = reason;
        this._details = details;
    }

    public source(source: string): APIError {
        return new APIError(this.target, source, this._reason);
    }

    public reason(reason: string): APIError {
        return new APIError(this.target, this._source, reason);
    }

    public details(details: string): APIError {
        return new APIError(
            this.target,
            this._source,
            this._reason,
            details
        );
    }

    public get parameter(): APIError {
        return this.source('parameter');
    }

    public get header(): APIError {
        return this.source('header');
    }

    public toString(): string {
        let source = this._source ? `${this._source }.` : '';
        let reason = this._reason ? `.${this._reason}` : '';
        let details = this._details ? `: ${this._details}` : '';

        return `${source}${this.target}${reason}${details}`;
    }
}
