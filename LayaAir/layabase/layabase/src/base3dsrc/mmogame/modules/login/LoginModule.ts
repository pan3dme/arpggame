class LoginModule extends Module {
    public getModuleName(): string {
        return "LoginModule";
    }

    protected listProcessors(): Array<Processor> {
        return [new LoginProcessor()];
    }
}  