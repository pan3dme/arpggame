class EngineModule extends Module {

    public getModuleName(): string {
        return "EngineModule";
    }
    protected listProcessors(): Array<Processor> {
        return [new EngineProcessor(),
                new NetBaseProcessor()
        ];
    }
}
