namespace GraphQlApi.Queries;


public class AnotherObj
{
    public int MyProperty { get; set; }
}

[ExtendObjectType("Query")]
public class AnotherQuery
{
    public AnotherObj GetAnother() => new AnotherObj() { MyProperty = 1 };
}
